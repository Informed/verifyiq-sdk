import { IVerifyIQ } from './types/SDK.interface';
import { AuthTypes } from '~/types/auth-types.enum';
import { Credentials } from '~/types/credentials.interface';
import { EventCallback } from '~/types/callback.interface';
import { EventsEnum } from '~/types/events.enum';
import Renderer from './renderer/renderer';
import { Nullable } from './types/nullable';

type SDKOptions = {
  url: string
};

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
      url: options.url
    });
    this.credentials = null;
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
   * Register callback for particular event
   * @param event {EventsEnum}
   * @param callback {EventCallback}
   */
  on(event: EventsEnum, callback: EventCallback) {
    this.renderer.on(event, callback);
    return this;
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