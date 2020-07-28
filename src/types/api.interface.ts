export type ApiEnvironment = 'staging' | 'prod';

export type ApiInfo = {
  host?: string;
  environment?: ApiEnvironment;
  authorization?: string;
};

export interface PartnerResponse {
  url: string;
}


export interface IApi {
  getPartner(): Promise<PartnerResponse>;
}