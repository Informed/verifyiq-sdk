import { IVerifyIQ } from './types/SDK.interface';
import { AuthTypes } from './types/auth-types.enum';
import { Credentials } from './types/credentials.interface';
import { VerificationActionPayload } from './types/verification-action.interface';
import {
  EventCallback,
  DocumentRequestCallback,
} from './types/callback.interface';
import { EventsEnum } from './types/events.enum';
import Renderer from './renderer/renderer';
import Api from './api/api';
import { Nullable } from './types/nullable';
import { ApiEnvironment } from './constants/api.constants';

interface SDKOptions {
  url: string;
  actionCallbackWebhookUrl: string;
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

  /**
   * Auth credentials of the SDK
   */
  private credentials: Nullable<Credentials>;

  constructor(options: SDKOptions) {
    this.renderer = new Renderer({
      url: options.url,
    });
    this.api = new Api({ environment: options.environment });
    this.credentials = null;
    this.onWaive(options.onWaive);
    this.onIncomplete(options.onIncomplete);
    this.onPass(options.onPass);
    this.onLoad(options.onLoad);
    this.onDocumentRequestedViaSms(options.onDocumentRequestedViaSms);
  }

  public static staging = ApiEnvironment.Staging;
  public static production = ApiEnvironment.Production;

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

  /**
   * Define credentials for SDK
   * Should be defined before render
   * @param credentials {Credentials}
   */
  setCredentials(credentials: Credentials) {
    this.credentials = credentials;
    return this;
  }

  /**
   * Register callback for iframe onLoad event
   * @param callback {VerificationActionCallback}
   */
  private onLoad(callback?: EventCallback<any>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Loaded, callback);
  }

  /**
   * Register callback for RequestIQ SMS Send event
   * @param callback {DocumentRequestCallback}
   */
  private onDocumentRequestedViaSms(callback?: DocumentRequestCallback) {
    if (!callback) return;

    this.renderer.on(EventsEnum.DocumentRequestedViaSMS, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onPass(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Pass, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onWaive(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Waive, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onIncomplete(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Incomplete, callback);
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
