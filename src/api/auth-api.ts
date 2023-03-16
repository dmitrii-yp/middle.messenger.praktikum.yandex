import BaseAPI from './base-api';
import { SigninData, SignupData, User } from '../typings/api-types';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  public signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  public getUser() {
    return this.http.get<User>('/user');
  }

  public logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
