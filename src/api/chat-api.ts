import BaseAPI from './base-api';
import { Chat, AddingUserToChat } from '../typings/api-types';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChats() {
    return this.http.get<Chat[]>();
  }

  public createChat(title: string) {
    return this.http.post('', { data: { title } });
  }

  public deleteChat(chatId: number) {
    return this.http.delete('', { data: { chatId } });
  }

  public addUsers(data: AddingUserToChat) {
    return this.http.put('/users', { data });
  }

  public deleteUsers(data: AddingUserToChat) {
    return this.http.delete('/users', { data });
  }

  async getToken(id: number) {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
}

export default new ChatAPI();
