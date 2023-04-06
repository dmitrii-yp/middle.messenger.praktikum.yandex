import Block from '../core/block';
import Store, {StoreEvents} from '../core/store';
import { isEqual } from '../helpers/utils';
import { State } from '../typings/store-types';

export const withStore =
  (mapStateToProps: (state: State | Indexed) => any) => (Component: typeof Block) => {
    let currentPropsFromState: any = {};

    return class WithStore extends Component {
      constructor(props: any = {}) {
        const state = Store.getState();
        currentPropsFromState = mapStateToProps(state);

        super({...props, ...currentPropsFromState});

        Store.on(StoreEvents.Updated, (newState: any) => {
          const newPropsFromState = mapStateToProps(newState);

          if (isEqual(currentPropsFromState, newPropsFromState)) {
            return;
          }

          currentPropsFromState = { ...newPropsFromState };
          this.setProps({ ...newPropsFromState });
        });
      }
    };
  };
