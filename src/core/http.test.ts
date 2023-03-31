import sinon from 'sinon';
import { HTTP } from './http';
import { expect } from 'chai';

describe('HTTP trasnport', () => {
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const originalXHR = global.XMLHttpRequest;


  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  beforeEach(() => {
    requests = [];
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  describe('GET', () => {
    it('should make GET request', () => {
      const http = new HTTP('/');
      http.get('/');

      expect(requests[0].method).to.eq('GET');
    });
  });

  // describe('POST', () => {

  // });
});
