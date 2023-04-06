import Block from '../../core/block';
import templateString from './text-button.hbs';
import AuthController from '../../controllers/auth-controller';
import { PropsWithRouter, withRouter } from '../../hocs/with-router';
import { Route } from '../../helpers/const';

interface TextButtonProps extends PropsWithRouter {
  label: string;
  href: string;
  red: boolean;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class TextButtonBase extends Block {
  constructor(props: TextButtonProps) {
    const { onClick } = props;
    super({
      ...props,
      events: {
        click: () => this.navigate(onClick),
      },
    });
  }

  static get componentName() {
    return 'TextButton';
  }

  private navigate(cb?: () => void) {
    if (cb) {
      cb();
      return;
    }

    if (this.props.href === Route.LOGOUT) {
      AuthController.logout();
      return;
    }

    this.props.router.go(this.props.href);
  }

  render() {
    return templateString as unknown as string;
  }
}

export const TextButton = withRouter(TextButtonBase as typeof Block);
