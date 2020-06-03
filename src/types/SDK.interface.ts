import { Credentials } from './credentials.interface';
import { EventCallback } from './callback.interface';
import { EventsEnum } from './events.enum';
import { AuthTypes } from './auth-types.enum';

export interface IVerifyIQ {
  setAuth(authType: AuthTypes): this;
  setCredentials(credentials: Credentials): this;
  on(event: EventsEnum, callback: EventCallback): this;
  enableLogging(isEnabled: boolean): this;
  render(htmlElement: HTMLElement): void;
}