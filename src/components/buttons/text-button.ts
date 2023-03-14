import Block from '../../core/block';
import templateString from 'bundle-text:./text-button.hbs';
import { PropsWithRouter, withRouter } from '../../hocs/with-router';

interface TextButtonProps extends PropsWithRouter {
  label: string;
  href: string;
  red: boolean;
  events?: {
    click: () => void;
  };
}

class TextButtonBase extends Block<TextButtonProps> {
  constructor(props: TextButtonProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  static get componentName() {
    return 'TextButton';
  }

  navigate() {
    this.props.router.go(this.props.href)
  }

  render() {
    return templateString as unknown as string;
  }
}

export const TextButton = withRouter(TextButtonBase as typeof Block);
