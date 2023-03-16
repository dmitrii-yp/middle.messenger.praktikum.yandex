import API, { UserAPI } from '../api/user-api';
import Store from '../core/store';
import Router from '../core/router';
import { APIError, User, PasswordUpdate } from '../typings/api-types';
import { Route } from '../helpers/const';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  public async changeData(data: Omit<User, 'id'>) {
    try {
      await this.api.changeData(data);
      Store.set('user.data', data);
      Router.go(Route.PROFILE);
    } catch (e: any) {
      return (e as APIError).reason;
    }
  }

  public async changePassword(data: PasswordUpdate) {
    try {
      await this.api.changePassword(data);
      Router.go(Route.PROFILE);
    } catch (e: any) {
      return (e as APIError).reason;
    }
  }
}

export default new UserController();
