import { Credentials } from './credentials.interface';
import { AuthTypes } from './auth-types.enum';

export interface IVerifyIQ {
  setAuth(authType: AuthTypes): this;
  setCredentials(credentials: Credentials): this;
  enableLogging(isEnabled: boolean): this;
  renderApplicationId(htmlElement: HTMLElement, applicationId: string): void;
}
