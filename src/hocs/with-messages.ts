import { State } from '../typings/store-types';
import { withStore } from './with-store';

export const withMessages = withStore(
  (state: State) => ({messages: {...state.messages}} || {})
);
