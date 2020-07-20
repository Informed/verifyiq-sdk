import { IVerifyIQ } from './types/SDK.interface';
import { AuthTypes } from '~/types/auth-types.enum';
import { Credentials } from '~/types/credentials.interface';
import { VerificationActionPayload } from '~/types/verification-action.interface';
import {
  EventCallback,
  VerificationActionCallback,
} from '~/types/callback.interface';
import { EventsEnum } from '~/types/events.enum';
import Renderer from './renderer/renderer';
import { Nullable } from './types/nullable';

interface SDKOptions {
  url: string;
  applicationId: string;
  onWaive?: VerificationActionCallback;
  onPass?: VerificationActionCallback;
  onIncomplete?: VerificationActionCallback;
  onLoad?: EventCallback<VerificationActionPayload>;
}

class VerifyIQ implements IVerifyIQ {
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
      applicationId: options.applicationId,
    });
    this.credentials = null;
    this.onWaive(options.onWaive);
    this.onIncomplete(options.onIncomplete);
    this.onPass(options.onPass);
    this.onLoad(options.onLoad);
  }

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
  onLoad(callback?: EventCallback<any>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Loaded, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onPass(callback?: VerificationActionCallback) {
    if (!callback) return;

    return this.renderer.on(
      EventsEnum.Pass,
      ({ verificationActionObj, reason }: VerificationActionPayload) => {
        callback(verificationActionObj, reason);
      }
    );
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onWaive(callback?: VerificationActionCallback) {
    if (!callback) return;

    return this.renderer.on(
      EventsEnum.Waive,
      ({ verificationActionObj, reason }: VerificationActionPayload) => {
        callback(verificationActionObj, reason);
      }
    );
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  onIncomplete(callback?: VerificationActionCallback) {
    if (!callback) return;

    return this.renderer.on(
      EventsEnum.Incomplete,
      ({ verificationActionObj, reason }: VerificationActionPayload) => {
        callback(verificationActionObj, reason);
      }
    );
  }

  /**
   * Render SDK
   * @param htmlElement {HTMLElement}
   */
  render(htmlElement: HTMLElement): void {
    this.renderer.setRoot(htmlElement);
    this.renderer.render();
  }
}

export default VerifyIQ;
