import { User, Chat, Message } from '../typings/api-types';

export interface State {
  user: {
    data?: User;
    error?: string;
  };
  chats?: {
    data: Chat[];
    activeChatId: string;
  };
  messages: Record<number, Message[]>;
}
