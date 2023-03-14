import { changeObjectProperty, isEqual } from '../helpers/utils';
import { EventBus } from './event-bus';
import Block from './block';
import { User } from '../api/types';

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  user: {
    data?: User;
    error?: string;
    isLoading?: boolean;
  };
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    changeObjectProperty(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export const withStore =
  (mapStateToProps: (state: State) => any) => (Component: typeof Block) => {
    let currentPropsFromState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        const state = store.getState();
        currentPropsFromState = mapStateToProps(state);

        super(...props, ...currentPropsFromState);

        store.on(StoreEvents.Updated, (newState: any) => {
          const newPropsFromState = mapStateToProps(newState);

          if (isEqual(currentPropsFromState, newPropsFromState)) {
            return;
          }

          currentPropsFromState = {...newPropsFromState};
          this.setProps({ ...newPropsFromState });
        });
      }
    };
  };


export default store;
