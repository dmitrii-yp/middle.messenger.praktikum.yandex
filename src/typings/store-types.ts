import { User, Chat, Message } from '../typings/api-types';

export interface State {
  user: {
    data?: User;
    error?: string;
  };
  chats?: ChatsState;
  messages: Record<number, Message[]>;
}

export interface ChatsState {
  data: Chat[];
  activeChatId: number;
  searchData: Chat[];
  searchQuery: string;
}
