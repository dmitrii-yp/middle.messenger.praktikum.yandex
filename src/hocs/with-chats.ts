import { State } from '../typings/store-types';
import { withStore } from './with-store';

export const withChats = withStore(
  (state: State) => ({chats: state.chats} || {})
);
