import Store from '../core/store';
import Router from '../core/router';
import MessageController from './message-controller';
import API, { ChatAPI } from '../api/chat-api';
import { APIError, Chat, NewChatResponse } from '../typings/api-types';
import { AppMessage, Route } from '../helpers/const';
import { ChatsState } from '../typings/store-types';

export class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  public async getChats() {
    try {
      const chats = (await this.api.getChats()) as unknown as Chat[];
      chats.forEach(async (chat: Chat) => {
        const token = await this.api.getToken(chat.id);

        await MessageController.connect(chat.id, token);
      });
      Store.set('chats.data', chats);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public setActiveChatId(id: number | null) {
    Store.set('chats.activeChatId', id);
  }

  public searchChats(searchQuery: string) {
    const chats = Store.getState().chats as ChatsState;

    //If search query is empty and there is no previous search query, do nothing
    if (!searchQuery && !chats.searchQuery) {
      return;
    }

    //If search query is empty and there is a previous search query, reset search
    if (!searchQuery && chats.searchQuery) {
      Store.set('chats', { ...chats, searchQuery, searchData: [] });
      return;
    }

    const searchData = chats.data.filter((chat) => {
      return chat.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    Store.set('chats', { ...chats, searchQuery, searchData });
  }

  public async createChat(title: string) {
    try {
      const newChatId = (await this.api.createChat(
        title
      )) as unknown as NewChatResponse;
      await this.getChats();
      if (newChatId.id) {
        this.setActiveChatId(newChatId.id);
      } else {
        Router.go(Route.CHATS);
      }
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async addUser(chatId: number, userId: number) {
    try {
      await this.api.addUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    try {
      await this.api.deleteUsers({ chatId, users: [userId] });
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.getChats();
      Router.go(Route.CHATS);
    } catch (e: unknown) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatController();
