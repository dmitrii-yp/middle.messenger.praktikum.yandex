import { State } from '../typings/store-types';
import { withStore } from './with-store';

export const withUser = withStore(
  (state: State) => ({ ...state.user.data } || {})
);
