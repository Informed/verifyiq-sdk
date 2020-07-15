import { Credentials } from './credentials.interface';
import { AuthTypes } from './auth-types.enum';
import {
  VerificationActionCallback,
  EventCallback,
} from '~/types/callback.interface';

export interface IVerifyIQ {
  setAuth(authType: AuthTypes): this;
  setCredentials(credentials: Credentials): this;
  onWaive?(callback?: VerificationActionCallback): void;
  onPass?(callback?: VerificationActionCallback): void;
  onIncomplete?(callback?: VerificationActionCallback): void;
  onLoad?(callback?: EventCallback<any>): void;
  enableLogging(isEnabled: boolean): this;
  render(htmlElement: HTMLElement): void;
}
