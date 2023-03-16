import BaseAPI from './base-api';
import { User, PasswordUpdate } from '../typings/api-types';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public changeData(data: Omit<User, 'id'>) {
    return this.http.put<User>('/profile', { data });
  }

  public changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  public changePassword(data: PasswordUpdate) {
    return this.http.put('/password', { data });
  }

  public getUserById(id: number) {
    return this.http.get<User>(`/${id}`);
  }

  public findUserByLogin(login: string) {
    return this.http.post<User[]>('/search', { data: { login } });
  }
}

export default new UserAPI();
