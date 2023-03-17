import BaseAPI from './base-api';
import { Chat, AddingUserToChat } from '../typings/api-types';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChats() {
    return this.http.get<Chat[]>();
  }

  public postChat(title: string) {
    return this.http.post('', { data: { title } });
  }

  public deleteChat(chatId: string) {
    return this.http.delete('', { data: { title: chatId } });
  }

  public addUsers(data: AddingUserToChat) {
    return this.http.put('/users', { data });
  }
}

export default new ChatAPI();
