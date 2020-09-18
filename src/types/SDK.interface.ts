
export type RenderByApplicationIdParams = { 
  htmlElement: HTMLElement,
  applicationId: string,
  applicant?: string,
  stipulation?: string
}

export interface IVerifyIQ {
  enableLogging(isEnabled: boolean): this;
  renderApplicationId({
    htmlElement,
    applicationId,
    applicant,
    stipulation
  }: RenderByApplicationIdParams): void;
}
