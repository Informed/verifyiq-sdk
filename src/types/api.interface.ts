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
  setActionWebhookUrl(webhookUrl: string): void;
  syncActionWebhook(payload: unknown): Promise<unknown>;

  getPartner(): Promise<PartnerResponse>;
}