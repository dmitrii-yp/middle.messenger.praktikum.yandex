import Block from './block';
import { isEqual } from '../helpers/utils';

function render(query:string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);
  return root;
}

class Route {
  private _block: Nullable<Block> = null;
  private pathname: string;
  private readonly _blockClass: typeof Block;
  private readonly query: string

  constructor(pathname: string, blockClass: typeof Block, query: string) {
    this.pathname = pathname;
    this._blockClass = blockClass;
    this.query = query;
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this.query, this._block);
      return;
    }
  }
}

class Router {
  private static __instance: Router;
  private _routes: Route[];
  private _currentRoute: Nullable<Route> = null;
  private _history = window.history;

  constructor(private readonly _rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this._rootQuery);

    this._routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }

  private getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');


