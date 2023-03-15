import { User } from '../typings/api-types';

export interface State {
  user: {
    data?: User;
    error?: string;
  };
}
