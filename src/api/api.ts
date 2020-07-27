import { ApiEnvironment } from '../constants/api.constants';
import type {
  ApiInfo,
  ApiEnvironment as ApiEnvironmentType,
  IApi,
  PartnerResponse,
} from '../types/api.interface';

const ORIGIN = 'driveinformed.com';

type APICallParams = {
  url?: string;
  method: 'GET' | 'POST' | 'PUT';
  body?: string;
  headers?: {
    [key: string]: string;
  };
};

type MapEnvSubdomainType = {
  [key: string]: string;
};

const mapEnvToSubdomain: MapEnvSubdomainType = {
  [ApiEnvironment.Production]: 'api',
};

/**
 * @description API class
 */
class API implements IApi {
  /**
   * Final Endpoint
   */
  _endpoint!: string;

  /**
   * Authorization for Informed API
   */
  _authorization!: string;

  /**
   * Registered Action webhook url
   */
  _actionWebhookUrl?: string;

  constructor(apiInfo: ApiInfo) {
    if (apiInfo.host) {
      this._constructWithOrigin(apiInfo);
      return;
    }

    this._constructWithEnvironment(apiInfo);
  }

  private _constructWithOrigin(apiInfo: ApiInfo) {
    this._endpoint = `${apiInfo.host}/api`;
    this._authorization = apiInfo.authorization || '';
  }

  private _constructWithEnvironment(apiInfo: ApiInfo) {
    const { environment, authorization } = apiInfo;
    const subdomain =
      mapEnvToSubdomain[environment as ApiEnvironmentType] || environment;

    this._endpoint = `https://${subdomain}.${ORIGIN}/api`;
    this._authorization = authorization || '';
  }

  /**
   * @description Getter for host
   * @returns {string}
   */
  get host(): string {
    return this._endpoint;
  }

  /**
   * @description Getter for authorization
   * @returns {string}
   */
  get authorization(): string {
    return this._authorization;
  }

  /**
   * @description Abstract way to combine methods
   *  and required parameters in the api
   * @param url
   * @param headers
   * @param {Object} params to send API call
   * @param {string} params.url - Endpoint Url
   * @param {string} params.method - API request method
   * @returns {Promise<Response>} - Response object
   */
  private _makeApiCall = ({
    url = '',
    headers,
    ...params
  }: APICallParams): Promise<Response> => {
    const _headers = new Headers({
      ...headers,
    });

    if (this._authorization) {
      _headers.append('Authorization', this._authorization);
    }

    const mUrl = `${this._endpoint}${url}`;

    return fetch(mUrl, {
      ...params,
      headers: _headers,
    });
  };

  /**
   * Register actionWebhookUrl
   * @param webhookUrl {String}
   */
  setActionWebhookUrl(webhookUrl: string): void {
    this._actionWebhookUrl = webhookUrl;
  }

  // @TODO(mihran):: provide valid url
  syncActionWebhook = (payload: unknown) => {
    if (!this._actionWebhookUrl) {
      return Promise.resolve(null);
    }

    const apiAction: APICallParams = {
      url: '/customer_portal/application_status_action',
      method: 'POST',
      body: JSON.stringify({
        url: this._actionWebhookUrl!,
        payload
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this._makeApiCall(apiAction);
  };

  getPartner(): Promise<PartnerResponse> {
    const apiAction: APICallParams = {
      url: '/verifyiq_url',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this._makeApiCall(apiAction)
      .then((response) => {
        if (!response.ok) { throw response; }
        return response.json();
      });
  }
}

export default API;
