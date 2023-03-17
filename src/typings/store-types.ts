import { User, Chat } from '../typings/api-types';

export interface State {
  user: {
    data?: User;
    error?: string;
  };
  chats?: Chat[];
}
