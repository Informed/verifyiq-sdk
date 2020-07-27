import { IVerifyIQ } from './types/SDK.interface';
import { AuthTypes } from './types/auth-types.enum';
import { VerificationActionPayload } from './types/verification-action.interface';
import {
  EventCallback,
  DocumentRequestCallback,
} from './types/callback.interface';
import { EventsEnum } from './types/events.enum';
import Renderer from './renderer/renderer';
import Api from './api/api';
import { ApiEnvironment } from './constants/api.constants';
import invariant from './utils/invariant';


interface SDKOptions {
  url: string;
  authToken: string;
  actionCallbackWebhookUrl?: string;
  environment: ApiEnvironment;
  onWaive?: EventCallback<any>;
  onPass?: EventCallback<any>;
  onIncomplete?: EventCallback<any>;
  onDocumentRequestedViaSms?: DocumentRequestCallback;
  onLoad?: EventCallback<any>;
}

class VerifyIQ implements IVerifyIQ {
  /**
   * Api instance
   */
  private api: Api;

  /**
   * Renderer instance
   */
  private renderer: Renderer;

  constructor(options: SDKOptions) {
    invariant(!!options.environment, 'Environment is required');
    invariant(!!options.authToken, 'authToken is required');

    this.renderer = new Renderer();

    this.api = new Api({
      environment: options.environment,
      authorization: options.authToken,
    });

    this.onWaive(options.onWaive);
    this.onIncomplete(options.onIncomplete);
    this.onPass(options.onPass);
    this.onLoad(options.onLoad);
    this.onDocumentRequestedViaSms(options.onDocumentRequestedViaSms);

    if (options.actionCallbackWebhookUrl) {
      this.api.setActionWebhookUrl(options.actionCallbackWebhookUrl);
    }

    this.initPartner();
  }

  public static Staging = ApiEnvironment.Staging;
  public static Production = ApiEnvironment.Production;

  /**
   * Enable/Disable logging
   * @param isEnabled {Boolean}
   */
  enableLogging(isEnabled: boolean) {
    this.renderer.enableLogging(isEnabled);
    return this;
  }

  /**
   * Defines SAML Login type
   * @param authType {AuthTypes}
   */
  setAuth(authType: AuthTypes) {
    this.renderer.setAuth(authType);
    return this;
  }

  private initPartner(): void {
    this.api.getPartner()
      .then((partner) => {
        this.renderer.setUrl(partner.url);
      });
  }

  /**
   * Wraps callback function with another function
   * Which sends request to actionWebhookUrl before
   * executing callback function
   * @param fn {Function} - Callback function
   */
  private wrapWithActionWebhook<T>(fn: EventCallback<T>): EventCallback<T> {
    return (...args) => {
      this.api.syncActionWebhook(args);
      return fn(...args);
    };
  }

  /**
   * Register callback for iframe onLoad event
   * @param callback {VerificationActionCallback}
   */
  private onLoad(callback?: EventCallback<any>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Loaded, this.wrapWithActionWebhook(callback));
  }

  /**
   * Register callback for RequestIQ SMS Send event
   * @param callback {DocumentRequestCallback}
   */
  private onDocumentRequestedViaSms(callback?: DocumentRequestCallback) {
    if (!callback) return;

    this.renderer.on(EventsEnum.DocumentRequestedViaSMS, this.wrapWithActionWebhook(callback));
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onPass(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Pass, this.wrapWithActionWebhook(callback));
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onWaive(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Waive, this.wrapWithActionWebhook(callback));
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onIncomplete(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Incomplete, this.wrapWithActionWebhook(callback));
  }

  /**
   * Render SDK
   * @param htmlElement {HTMLElement}
   */
  private render(htmlElement: HTMLElement): void {
    this.renderer.setRoot(htmlElement);
    this.renderer.render();
  }

  /**
   * Render application by id
   * @param htmlElement {HTMLElement}
   * @param applicationId {String}
   */
  public renderApplicationId(htmlElement: HTMLElement, applicationId: string) {
    this.renderer.applicationId = applicationId;
    this.render(htmlElement);
  }
}

export default VerifyIQ;
