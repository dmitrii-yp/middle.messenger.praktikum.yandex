import API, { ChatAPI } from '../api/chat-api';
import Store from '../core/store';
import { APIError } from '../typings/api-types';
import { AppMessage } from '../helpers/const';
import Router from '../core/router';

export class UserController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  public async getChats() {
    try {
      const data = await this.api.getChats();
      Store.set('chats.data', data);
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public setActiveChatId(id: number) {
    Store.set('chats.activeChatId', id);
  }

  public async createChat(title: string) {
    try {
      await this.api.createChat(title);
      await this.getChats();
      Router.go('/chats');
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }
}

export default new UserController();
