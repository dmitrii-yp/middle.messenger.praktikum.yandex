import Block from '../core/block';
import Router from '../core/router';

export const withRouter = (Component: typeof Block) => {
  return class WithRouter extends Component {
    constructor(props: any) {
      super({...props, router: Router})
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
