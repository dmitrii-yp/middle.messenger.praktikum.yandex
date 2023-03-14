import BaseAPI from './base-api';
import { SigninData, SignupData, User } from './types';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  getUser() {
    return this.http.get<User>('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
