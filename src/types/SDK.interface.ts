import { AuthTypes } from './auth-types.enum';

export interface IVerifyIQ {
  setAuth(authType: AuthTypes): this;
  enableLogging(isEnabled: boolean): this;
  renderApplicationId(htmlElement: HTMLElement, applicationId: string): void;
}
