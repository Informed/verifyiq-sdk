export interface IVerifyIQ {
  enableLogging(isEnabled: boolean): this;
  renderApplicationId(htmlElement: HTMLElement, applicationId: string): void;
}
