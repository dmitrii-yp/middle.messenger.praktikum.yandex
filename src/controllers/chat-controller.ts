import Store from '../core/store';
import Router from '../core/router';
import MessageController from './message-controller';
import API, { ChatAPI } from '../api/chat-api';
import { APIError, NewChatResponse } from '../typings/api-types';
import { AppMessage, Route } from '../helpers/const';

export class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  public async getChats() {
    try {
      const chats = await this.api.getChats();
      chats.forEach(async (chat) => {
        const token = await this.api.getToken(chat.id);

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
      const newChatId = (await this.api.createChat(title)) as NewChatResponse;
      await this.getChats();
      if (newChatId.id) {
        this.setActiveChatId(newChatId.id);
      } else {
        Router.go(Route.CHATS);
      }
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async addUser(chatId: number, userId: number) {
    try {
      await this.api.addUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    try {
      await this.api.deleteUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatController();
