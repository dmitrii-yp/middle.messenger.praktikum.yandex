import Store from '../core/store';
import Router from '../core/router';
import MessageController from './message-controller';
import API, { AuthAPI } from '../api/auth-api';
import { APIError } from '../typings/api-types';
import { AppMessage, Route } from '../helpers/const';
import { SigninData, SignupData } from '../typings/api-types';

export class AuthController {
  private readonly api: AuthAPI;

  constructor(api: AuthAPI) {
    this.api = api;
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.getUser();
      Router.go(Route.CHATS);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.getUser();

      Router.go(Route.CHATS);
    } catch (e) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async getUser() {
    const user = await this.api.getUser();

    Store.set('user.data', user);
  }

  public async logout() {
    try {
      await this.api.logout();
      MessageController.closeAll();
      Store.set('user.data', undefined);
      Router.go('/');
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

export default new AuthController(API);
