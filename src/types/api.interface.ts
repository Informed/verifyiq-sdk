export type ApiVersion = string;
export type ApiEnvironment = 'staging' | 'prod';

export type ApiInfo = {
  host?: string;
  version?: ApiVersion;
  environment?: ApiEnvironment;
  authorization?: string;
};


export interface IApi {
  setActionWebhookUrl(webhookUrl: string): void;
  syncActionWebhook(payload: unknown): Promise<unknown>;
}