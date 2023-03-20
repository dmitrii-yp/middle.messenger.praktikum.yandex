import Store from '../core/store';
import Router from '../core/router';
import MessageController from './message-controller';
import API, { ChatAPI } from '../api/chat-api';
import { APIError } from '../typings/api-types';
import { AppMessage } from '../helpers/const';

export class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  public async getChats() {
    try {
      const chats = await this.api.getChats();
      chats.forEach(async (chat) => {
        const token = await this.api.getToken(chat.id)

        await MessageController.connect(chat.id, token);
      });
      Store.set('chats.data', chats);
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public setActiveChatId(id: number | null) {
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

  public async addUser(chatId: number, userId: number) {
    try {
      await this.api.addUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go('/chats');
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    try {
      await this.api.deleteUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go('/chats');
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.getChats();
      Router.go('/chats');
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }
}


export default new ChatController();
