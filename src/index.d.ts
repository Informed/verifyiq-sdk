import IpcMessageClass from './renderer/ipc-message.class';
import { VerificationActionPayload as VerificationActionPayloadInterface } from './types/verification-action.interface';

declare namespace VerifyIQ {
  enum AuthTypes {
    Tab,
    Popup,
  }

  interface Credentials {
    token: string;
  }

  enum EventsEnum {
    Loaded,
  }

  type EventCallback = (payload?: any) => void;
}

declare class VerifyIQ {
  constructor();

  setAuth(authType: VerifyIQ.AuthTypes): VerifyIQ;
  setCredentials(credentials: VerifyIQ.Credentials): VerifyIQ;
  on(event: VerifyIQ.EventsEnum, callback: VerifyIQ.EventCallback): VerifyIQ;
  enableLogging(isEnabled: boolean): VerifyIQ;
  render(htmlElement: HTMLElement): void;
}

export type IpcMessage = IpcMessageClass;
export type VerificationActionPayload = VerificationActionPayloadInterface;
