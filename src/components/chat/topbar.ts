import Block from '../../core/block';
import templateString from 'bundle-text:./topbar.hbs';

export class ChatTopBar extends Block {
  constructor(props: any) {
    super(props);
  }

  static get componentName() {
    return 'ChatTopBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
