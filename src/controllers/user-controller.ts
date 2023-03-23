import API, { UserAPI } from '../api/user-api';
import Store from '../core/store';
import Router from '../core/router';
import { APIError, User, PasswordUpdate } from '../typings/api-types';
import { Route, AppMessage } from '../helpers/const';

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
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async changePassword(data: PasswordUpdate) {
    try {
      await this.api.changePassword(data);
      Router.go(Route.PROFILE);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      const userData = await this.api.changeAvatar(data);
      Store.set('user.data', userData);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async getUserById(id: number) {
    try {
      return await this.api.getUserById(id);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async findUserByLogin(login:string) {
    try {
      return await this.api.findUserByLogin(login);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }
}

export default new UserController();
