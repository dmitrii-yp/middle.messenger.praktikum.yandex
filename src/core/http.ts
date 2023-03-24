type Options = {
  data?: unknown;
  headers?: Indexed<string>;
  timeout?: number;
  method: string;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod<Response> = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<Response>;

enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

const DEFAULT_TIMEOUT = 5000;

export class HTTP {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTP.API_URL}${endpoint}`;
  }

  public get: HTTPMethod<Response> = (
    path = '/',
    options = {}
  ) => {
    return this.request(
      this.endpoint + path,
      { ...options, method: Methods.GET },
      options.timeout ?? DEFAULT_TIMEOUT
    );
  }

  // PUT, POST, DELETE
  public put: HTTPMethod<Response> = (
    path: string,
    options = {}
  ) => {
    return this.request(
      this.endpoint + path,
      { ...options, method: Methods.PUT },
      options.timeout ?? DEFAULT_TIMEOUT
    );
  }

  public post: HTTPMethod<Response> = (
    path: string,
    options = {}
  ) => {
    return this.request(
      this.endpoint + path,
      { ...options, method: Methods.POST },
      options.timeout ?? DEFAULT_TIMEOUT
    );
  }

  public delete: HTTPMethod<Response> = (
    path: string,
    options = {}
  ) => {
    return this.request(
      this.endpoint + path,
      { ...options, method: Methods.DELETE },
      options.timeout ?? DEFAULT_TIMEOUT
    );
  }

  private request<Response>(
    url: string,
    options: Options,
    timeout: number
  ): Promise<Response> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.timeout = timeout;
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Methods.GET || !data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
      xhr.withCredentials = true;

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data) ?? null);
      }
    });
  }
}
