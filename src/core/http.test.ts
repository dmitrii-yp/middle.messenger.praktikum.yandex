import sinon from 'sinon';
import { HTTP } from './http';
import { expect } from 'chai';

describe('HTTP trasnport', () => {
  const originalXHR = global.XMLHttpRequest;
  const url = '/';
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let http: HTTP;

  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };

    http = new HTTP(url);
  });

  beforeEach(() => {
    requests = [];
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  describe('GET', () => {
    it('should make GET request', () => {
      http.get(url);

      expect(requests[0].method).to.eq('GET');
    });
  });

  describe('POST', () => {
    it('should make POST request', () => {
      http.post(url);

      expect(requests[0].method).to.eq('POST');
    });

    it('should include data in POST request', () => {
      const testData = { test: 'test' };
      http.post(url, { data: testData });

      expect(requests[0].requestBody).to.eq(JSON.stringify(testData));
    });
  });

  describe('PUT', () => {
    it('should make PUT request', () => {
      http.put(url);

      expect(requests[0].method).to.eq('PUT');
    });

    it('should send FormData in PUT request', () => {
      const formData = new FormData();
      formData.append('test', 'test');
      http.put(url, { data: formData });

      expect(requests[0].requestBody).to.be.an.instanceof(FormData);
    });

    it('should not add ContentType header to FormData in PUT request', () => {
      const formData = new FormData();
      formData.append('test', 'test');
      http.put(url, { data: formData });

      expect(requests[0].requestHeaders).to.be.an.instanceof(Object);
      expect(requests[0].requestHeaders).to.be.empty;
    });
  });

  describe('DELETE', () => {
    it('should make DELETE request', () => {
      http.delete(url);

      expect(requests[0].method).to.eq('DELETE');
    });
  });
});
