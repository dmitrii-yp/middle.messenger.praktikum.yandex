import { AuthController } from './auth-controller';
import { AuthAPI } from '../api/auth-api';
import sinon from 'sinon';
import { expect } from 'chai';
import { SignupData } from '../typings/api-types';

const AuthApiMock = {
  signin: sinon.stub(),
  signup: sinon.stub(),
  getUser: sinon.stub(),
  logout: sinon.stub(),
};

const AuthControllerMocked = new AuthController(
  AuthApiMock as unknown as AuthAPI
);
const data = { login: 'test', password: 'test' };

describe('AuthController', () => {
  beforeEach(() => {
    AuthApiMock.signin.reset();
    AuthApiMock.signup.reset();
    AuthApiMock.getUser.reset();
    AuthApiMock.logout.reset();
  });

  it('should call signin method of AuthAPI with passed data', async () => {
    await AuthControllerMocked.signin(data);

    expect(AuthApiMock.signin.calledOnceWithExactly(data)).to.be.true;
  });

  it('should call signup method of AuthAPI with passed data', async () => {
    await AuthControllerMocked.signup(data as SignupData);

    expect(AuthApiMock.signup.calledOnceWithExactly(data)).to.be.true;
  });

  it('should call getUser method of AuthAPI', async () => {
    await AuthControllerMocked.getUser();

    expect(AuthApiMock.getUser.calledOnce).to.be.true;
  });

  it('should call logout method of AuthAPI', async () => {
    await AuthControllerMocked.logout();

    expect(AuthApiMock.logout.calledOnce).to.be.true;
  });
});
