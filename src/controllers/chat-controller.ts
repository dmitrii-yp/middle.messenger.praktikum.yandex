import API, { ChatAPI } from '../api/chat-api';
import Store from '../core/store';
import { APIError,} from '../typings/api-types';
import { AppMessage } from '../helpers/const';

export class UserController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  public async getChats() {
    try {
      const data = await this.api.getChats();
      Store.set('chats.data', data);
      console.log(Store.getState());

    } catch (e: any) {
      return (e as APIError)?.reason || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public setActvieChatId(id: string) {
    Store.set('chats.actvieChatId', id);
  }
}

export default new UserController();
