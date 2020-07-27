import { EventsEnum } from '../types/events.enum';
import { EventCallback } from '../types/callback.interface';
import { compact } from '../utils/compact';
import { Nullable } from '../types/nullable';
import { INJECTED_UI_ID } from '../constants';
import Logger from '../utils/logger';
import { AuthTypes } from '../types/auth-types.enum';
import { IPCSerializable } from '../types/ipc.interface';
import { IpcMessage } from '../types/ipc.interface';
import { isObject } from '../utils/isObject';

export interface RendererOptions {
  element?: HTMLElement;
  url: string;
}

export interface IRenderer {
  setRoot(dom: HTMLElement): void;
  setUrl(url: string): void;
  exec(command: string): void;
  on(event: EventsEnum, callback: EventCallback<any>): void;
  enableLogging(enabled: boolean): void;
  setAuth(authType: AuthTypes): void;
  render(): void;
}

class Renderer implements IRenderer {
  /**
   * EventsMap is like event bus
   * Keeps registered callbacks for each event
   */
  private _eventsMap: Map<EventsEnum, EventCallback<any>[]>;
  /**
   * DOM element where frame should be injected
   */
  private _dom: Nullable<HTMLElement>;
  /**
   * URL of the frame from where should be loaded
   */
  private _url?: string;

  private _applicationId!: string;
  /**
   * Frame DOM element
   */
  private _frame: Nullable<Window>;
  /**
   * Logger instance
   */
  private _logger: Logger;

  constructor() {
    this._eventsMap = new Map();
    this._dom = null;
    this._frame = null;
    this._logger = new Logger(false);

    this.onEventReceived = this.onEventReceived.bind(this);
    window.addEventListener('message', this.onEventReceived);
  }

  /**
   * Initializes @property _applicationId property
   * @param applicationId {String}
   */
  set applicationId(applicationId: string) {
    this._applicationId = applicationId;
  }

  /**
   * Defines logs visibility
   * @param enabled {Boolean}
   */
  public enableLogging(enabled: boolean): void {
    this._logger.setEnabled(enabled);
  }

  /**
   * Defines the root where renderer should be injected
   * @param dom {HTMLElement}
   */
  public setRoot(dom: HTMLElement) {
    this._dom = dom;
  }

  /**
   * Defines SAML Login type
   * @param authType {AuthTypes}
   */
  public setAuth(authType: AuthTypes): void {
    const serializable = this._generateExecCommand('authType', authType);

    this.exec(serializable.serialize());
  }

  public setUrl(url: string): void {
    this._url = url;
    this.invokeListeners(EventsEnum.PartnerLoaded);
  }

  /**
   * Generates IPCSerializable instance by the given parameters
   * @param type {String}
   * @param payload {*}
   */
  protected _generateExecCommand(type: string, payload?: any): IPCSerializable {
    return new IpcMessage(type, payload);
  }

  /**
   * Inflates UI, with styles, attributes and persists
   * on the instance of the renderer
   */
  protected _inflateUI(): HTMLElement {
    const frame = document.createElement('iframe');
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.id = INJECTED_UI_ID;
    frame.src = `${this._url}/applications/${this._applicationId}`;
    frame.onload = () => {
      this._frame = frame.contentWindow!;
    };

    return frame;
  }

  /**
   * Invokes listeners of particular event listeners
   * @param event {EventsEnum}
   * @param params {unknown}
   */
  private invokeListeners(event: EventsEnum, ...params: unknown[]): void {
    if (!this._eventsMap.has(event)) {
      return;
    }
    const callbacks = this._eventsMap.get(event)!;
    callbacks.forEach(cb => cb(...params));
  }

  /**
   * Handles events coming from the rendered frame
   * @param event {MessageEvent}
   */
  private onEventReceived(event: MessageEvent) {
    if (event.origin !== this._url) {
      return;
    }
    const ipcMessage = IpcMessage.fromEvent(event);

    if (!ipcMessage) {
      return;
    }
    const { message, payload } = ipcMessage;
    const messageAsEvent = <EventsEnum>(message as unknown);

    if (!this._eventsMap.has(messageAsEvent)) {
      return;
    }

    const formattedPayload = isObject(payload)
      ? Object.values(payload)
      : [payload];

    this.invokeListeners(messageAsEvent, ...formattedPayload);
  }

  /**
   * Register callback for particular event
   * @param event {EventsEnum}
   * @param callback {EventCallback}
   */
  public on(event: EventsEnum, callback: EventCallback<any>): void {
    const callbacksArr = this._eventsMap.has(event)
      ? this._eventsMap.get(event)
      : [];

    const callbacks = [...compact<EventCallback<any>>(callbacksArr), callback];

    this._eventsMap.set(event, callbacks);
  }

  /**
   * Execute command inside frame
   * @param command {String}
   */
  public exec(command: string): void {
    if (!this._frame) {
      this._logger.warn(`
      frame is not initialized yet, but code is trying to execute
      a command: ${command}
      `);
      return;
    }
    this._logger.log(command);
    this._frame.postMessage(command, '*');
  }

  /**
   * Render frame
   */
  public render(): void {
    if (!this._url) {
      this.on(EventsEnum.PartnerLoaded, () => this.render());
      this._logger.warn(`
        URL still not initialized,
        frame will be loaded immediately when the URL will be set
      `);
      return;
    }

    const element = this._inflateUI();

    if (!this._dom) {
      throw new Error('DOM is not set before rendering');
    }

    this._dom.appendChild(element);
  }
}

export default Renderer;
