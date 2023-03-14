import API, { AuthAPI } from '../api/auth-api';
import {SigninData, SignupData} from '../api/types';
import store from '../core/store';
// import router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.getUser();
      // router.go('/profile');
    } catch (e) {
      store.set('user.error', (e as Error).message)
      console.error(e);
    }
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.getUser();

      // router.go('/profile');
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  public async getUser() {
    store.set('user.isLoading', true);
    const user = await this.api.getUser();

    store.set('user.data', user);
    store.set('user.isLoading', false);

  }

  public async logout() {
    try {
      await this.api.logout();
      store.set('user.data', undefined)

      // router.go('/');
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

export default new AuthController();
