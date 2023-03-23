import { changeObjectProperty } from '../helpers/utils';
import { State } from '../typings/store-types';
import { EventBus } from './event-bus';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: State | Record<string, string> = {};

  public set(keypath: string, data: unknown) {
    changeObjectProperty(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export default new Store();
