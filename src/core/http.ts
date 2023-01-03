import { queryStringify } from '../helpers/utils';

type Options = {
  data?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
  method: string;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

const DEFAULT_TIMEOUT = 5000;
enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export class HTTP {
  get: HTTPMethod = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: Methods.GET },
      options.timeout
    ) as Promise<XMLHttpRequest>;
  };

  // PUT, POST, DELETE
  put: HTTPMethod = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: Methods.PUT },
      options.timeout ?? DEFAULT_TIMEOUT
    ) as Promise<XMLHttpRequest>;
  };

  post: HTTPMethod = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: Methods.POST },
      options.timeout
    ) as Promise<XMLHttpRequest>;
  };

  delete: HTTPMethod = (url: string, options = {}) => {
    return this.request(
      url,
      { ...options, method: Methods.DELETE },
      options.timeout
    ) as Promise<XMLHttpRequest>;
  };

  request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    if (method === Methods.GET && data) {
      url += queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data) ?? null);
      }
    });
  };
}
