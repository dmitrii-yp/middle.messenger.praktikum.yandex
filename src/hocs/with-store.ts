import Block from '../core/block';
import Store, {StoreEvents} from '../core/store';
import { State } from '../typings/store-types';
import { isEqual } from '../helpers/utils';

export const withStore =
  (mapStateToProps: (state: State) => any) => (Component: typeof Block) => {
    let currentPropsFromState: any = {};

    return class WithStore extends Component {
      constructor(props: any = {}) {
        const state = Store.getState();
        currentPropsFromState = mapStateToProps(state);

        super({...props, ...currentPropsFromState});

        Store.on(StoreEvents.Updated, (newState: any) => {
          const newPropsFromState = mapStateToProps(newState);
          console.log( Component.componentName, newPropsFromState);


          if (isEqual(currentPropsFromState, newPropsFromState)) {
            return;
          }

          currentPropsFromState = { ...newPropsFromState };
          this.setProps({ ...newPropsFromState });
        });
      }
    };
  };
