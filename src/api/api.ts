import { ApiEnvironment } from '../constants/api.constants';
import type {
  ApiInfo,
  ApiEnvironment as ApiEnvironmentType,
} from '../types/api-info';

const ORIGIN = 'driveinformed.com';

type APICallParams = {
  url?: string;
  method: string;
  body?: string;
  fullUrl?: string;
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
class API {
  /**
   * Final Endpoint
   */
  _endpoint!: string;

  /**
   * Supported API version
   */
  _apiV!: string;

  /**
   * Authorization for Informed API
   */
  _authorization!: string;

  constructor(apiInfo: ApiInfo) {
    if (apiInfo.host) {
      this._constructWithOrigin(apiInfo);
      return;
    }

    this._constructWithEnvironment(apiInfo);
  }

  private _constructWithOrigin(apiInfo: ApiInfo) {
    this._apiV = '/api';
    this._endpoint = `${apiInfo.host}${this._apiV}`;
    this._authorization = apiInfo.authorization || '';
  }

  private _constructWithEnvironment(apiInfo: ApiInfo) {
    const { version, environment, authorization } = apiInfo;
    const subdomain =
      mapEnvToSubdomain[environment as ApiEnvironmentType] || environment;

    this._apiV = `/api/v${version}`;
    this._endpoint = `https://${subdomain}.${ORIGIN}${this._apiV}`;
    this._authorization = authorization || '';
  }

  /**
   * @description Getter for host
   * @returns {string}
   */
  get host() {
    return this._endpoint;
  }

  /**
   * @description Getter for authorization
   * @returns {string}
   */
  get authorization() {
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
    // eslint-disable-next-line no-unused-vars
    fullUrl,
    ...params
  }: APICallParams) => {
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

  // @TODO(mihran):: provide valid url
  actionCallbackWebhook = (payload: any) => {
    const apiAction = {
      url: '/',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this._makeApiCall(apiAction);
  };
}

export default API;
