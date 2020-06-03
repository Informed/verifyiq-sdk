import { EventsEnum } from '~/types/events.enum';
import { EventCallback } from '~/types/callback.interface';
import { compact } from '~/utils/compact';
import { Nullable } from '~/types/nullable';
import { INJECTED_UI_ID } from '~/constants';
import Logger from '~/utils/logger';
import { AuthTypes } from '~/types/auth-types.enum';
import { IPCSerializable } from '~/types/ipc.interface';
import IpcMessage from './ipc-message.class';

export interface RendererOptions {
  element?: HTMLElement,
  url: string
}

export interface IRenderer {
  setRoot(dom: HTMLElement): void;
  exec(command: string): void;
  on(event: EventsEnum, callback: EventCallback): void;
  enableLogging(enabled: boolean): void;
  setAuth(authType: AuthTypes): void;
  render(): void;
}

class Renderer implements IRenderer {
  /**
   * EventsMap is like event bus
   * Keeps registered callbacks for each event
   */
  private _eventsMap: Map<EventsEnum, EventCallback[]>;
  /**
   * DOM element where frame should be injected
   */
  private _dom: Nullable<HTMLElement>;
  /**
   * URL of the frame from where should be loaded
   */
  private _url: string;
  /**
   * Frame DOM element
   */
  private _frame: Nullable<Window>;
  /**
   * Logger instance
   */
  private _logger: Logger;

  constructor(options: RendererOptions) {
    this._eventsMap = new Map();
    this._dom = options.element || null;
    this._url = options.url;
    this._frame = null;
    this._logger = new Logger(false);

    this.onEventReceived = this.onEventReceived.bind(this);
    window.addEventListener('message', this.onEventReceived);
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
    frame.src = this._url;
    frame.onload = () => {
      this._frame = frame.contentWindow!;
    };

    return frame;
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
    this._eventsMap.get(messageAsEvent)?.forEach((callback) => {
      callback(payload);
    });
  }

  /**
   * Register callback for particular event
   * @param event {EventsEnum}
   * @param callback {EventCallback}
   */
  public on(event: EventsEnum, callback: EventCallback): void {
    const callbacksArr = this._eventsMap.has(event)
      ? this._eventsMap.get(event)
      : [];

    const callbacks = [
      ...compact<EventCallback>(callbacksArr),
      callback
    ];

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
    const element = this._inflateUI();

    if (!this._dom) {
      throw new Error('DOM is not set before rendering');
    }

    this._dom.appendChild(element);
  }
}

export default Renderer;