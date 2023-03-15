import API, { AuthAPI } from '../api/auth-api';
import Store from '../core/store';
import Router from '../core/router';
import { APIError } from '../typings/api-types';
import { Route } from '../helpers/consts';
import { SigninData, SignupData } from '../typings/api-types';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.getUser();
      Router.go(Route.PROFILE);
    } catch (e: any) {
      return (e as APIError).reason;
    }
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.getUser();

      Router.go(Route.PROFILE);
    } catch (e) {
      return (e as APIError).reason;
    }
  }

  public async getUser() {
    const user = await this.api.getUser();

    Store.set('user.data', user);
  }

  public async logout() {
    try {
      await this.api.logout();
      Store.set('user.data', undefined);
      Router.go('/');
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

export default new AuthController();
