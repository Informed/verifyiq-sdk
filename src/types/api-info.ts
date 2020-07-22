export type ApiVersion = string;
export type ApiEnvironment = 'staging' | 'prod';

export type ApiInfo = {
  host?: string;
  version?: ApiVersion;
  environment?: ApiEnvironment;
  authorization?: string;
};
