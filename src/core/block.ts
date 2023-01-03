import Handlebars from 'handlebars';
import { EventBus } from './event-bus';
import { nanoid } from 'nanoid';


export default class Block<P extends Record<string, any> = Record<string, any>> {
  static Event = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: Record<string, Block>;
  private eventBus: EventBus;
  public id: string = nanoid(6);

  constructor(context?: P) {
    const { props, children } = this._getPropsAndChildren(context);

    this.children = children;

    this.eventBus = new EventBus();
    this.props = this._makePropsProxy(props || ({} as P));

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.Event.INIT);
  }

  static get componentName() {
    return 'Block';
  }

  private _makePropsProxy(props: P) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;

        self.eventBus.emit(Block.Event.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.Event.INIT, this.init.bind(this));
    eventBus.on(Block.Event.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.Event.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.Event.FLOW_RENDER, this._render.bind(this));
  }

  public init() {
    this.eventBus.emit(Block.Event.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
    return;
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (newProps: any) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props as unknown as Record<string, unknown>, newProps);
  };

  compile(templateString: string, context: any): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(templateString);

    const htmlString = template({ ...context, children: this.children }); //Находит переменные в шаблонe и заменяет их на значения из контекста

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      const childNode = fragment.content.querySelector(
        `[data-id=id-${child.id}]`
      );

      if (!childNode) {
        return;
      }

      childNode.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  _render() {
    const templateString = this.render();

    const fragment = this.compile(templateString, { ...this.props });

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element!.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  protected render() {
    return ``;
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }

    Object.entries(events).forEach(([e, callback]) => {
      this._element!.addEventListener(e, callback);
    });
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([e, callback]) => {
      this._element!.removeEventListener(e, callback);
    });
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  private _getPropsAndChildren(propsAndChildren: any) {
    const props: any = {};
    const children: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      }
      props[key] = value;
    });

    return { props, children };
  }
}
