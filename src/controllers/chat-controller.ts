import API, { ChatAPI } from '../api/chat-api';
import Store from '../core/store';
import { APIError } from '../typings/api-types';
import { AppMessage } from '../helpers/const';
import Router from '../core/router';

export class ChatController {
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

const controller = new ChatController();

// @ts-ignore
window.chatController = controller;


export default controller;
