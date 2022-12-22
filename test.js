const XMLHttpRequest = require('xhr2');

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    return '';
  }
  const params = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  return params.length ? `?${params.join('&')}` : '';
}

class HTTP {
  get = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  // PUT, POST, DELETE
  put = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url, options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    if (method === METHODS.GET) {
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

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

const http = new HTTP();

function fetchWithRetry(url, options) {
  let attempts = 0;

  const handleError = () => {
    if (attempts < options.retries) {
      console.log(attempts)
      attempts += 1;
      return get();
    }
    throw new Error('Max retries');
  };

  const get = () => {
    return http
      .get(url, options)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        throw new Error(res.status);
      })
      .catch((e) => {
        // console.log(e);
        return handleError();
      });
  };

  return get();
}

fetchWithRetry('https://ipinfo2.io/ip', {
  retries: 3,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => console.log(res.response));
