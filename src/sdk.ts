import { IVerifyIQ, RenderByApplicationIdParams } from './types/SDK.interface';
import { AuthTypes } from './types/auth-types.enum';
import { VerificationActionPayload } from './types/verification-action.interface';
import {
  EventCallback,
  DocumentRequestCallback,
} from './types/callback.interface';
import { EventsEnum } from './types/events.enum';
import { IpcMessage } from './types/ipc.interface';
import Renderer from './renderer/renderer';
import Api from './api/api';
import { ApiEnvironment, ApplicantTypes, StipulationTypes } from './constants/api.constants';
import invariant from './utils/invariant';
import { checkIsValidUrl } from './utils/checkIsValidUrl';

interface SDKOptions {
  url: string;
  authToken: string;
  authType?: AuthTypes;
  actionCallbackWebhookUrl?: string;
  environment: ApiEnvironment;
  onWaive?: EventCallback<any>;
  onPass?: EventCallback<any>;
  onIncomplete?: EventCallback<any>;
  onDocumentRequestedViaSms?: DocumentRequestCallback;
  onLoad?: EventCallback<any>;
}

class VerifyIQ implements IVerifyIQ {
  public static Staging = ApiEnvironment.Staging;
  public static Production = ApiEnvironment.Production;
  public static ApplicantTypes = ApplicantTypes;
  public static StipulationTypes = StipulationTypes;


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

    if (options.url) {
      this.renderer.setUrl(options.url);
    }
    const { authType } = options;
    authType ? this.setAuth(authType) : this.setAuth(AuthTypes.Popup);



    this.api = new Api({
      environment: options.environment,
      authorization: options.authToken,
    });

    this.onWaive(options.onWaive);
    this.onIncomplete(options.onIncomplete);
    this.onPass(options.onPass);
    this.onLoad(options.onLoad);
    this.onDocumentRequestedViaSms(options.onDocumentRequestedViaSms);

    if (!options.url) {
      this.initPartner();
    }

    this.registerAfterLoadActions(options.actionCallbackWebhookUrl);
  }

  /**
   * Enable/Disable logging
   * @param isEnabled {Boolean}
   */
  public enableLogging(isEnabled: boolean) {
    this.renderer.enableLogging(isEnabled);
    return this;
  }

  /**
   * Transfers data to the frame when it's loaded
   * @param actionWebhookUrl {String}
   */
  private registerAfterLoadActions(actionWebhookUrl?: string) {
    if (!actionWebhookUrl) {
      return;
    }

    this.onLoad(() => {
      const command = new IpcMessage(
        EventsEnum.ActionWebhookUrlInitialize,
        actionWebhookUrl
      );
      this.renderer.exec(command);
    });
  }

  /**
   * Fetch partner url
   */
  private initPartner(): void {
    this.api.getPartner().then((partner) => {
      this.renderer.setUrl(partner.url);
    });
  }

  /**
   * Defines SAML Login type
   * @param authType {AuthTypes}
   */
  private setAuth(authType: AuthTypes) {
    this.renderer.setAuth(authType);
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
  private onPass(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Pass, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  private onWaive(callback?: EventCallback<VerificationActionPayload>) {
    if (!callback) return;

    return this.renderer.on(EventsEnum.Waive, callback);
  }

  /**
   * Register callback for verification specific event
   * @param callback {VerificationActionCallback}
   */
  private onIncomplete(callback?: EventCallback<VerificationActionPayload>) {
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
  public renderApplicationId({
    htmlElement,
    applicationId,
    applicant = VerifyIQ.ApplicantTypes.PrimaryApplicant,
    stipulation = '',
    collectedDocumentWebhookUrl,
  }: RenderByApplicationIdParams) {
    this.renderer.applicationId = applicationId;
    this.renderer.applicant = applicant;
    this.renderer.stipulation = stipulation;
    this.renderer.collectedDocumentWebhookUrl = collectedDocumentWebhookUrl;

    this.render(htmlElement);
  }
}

export default VerifyIQ;
