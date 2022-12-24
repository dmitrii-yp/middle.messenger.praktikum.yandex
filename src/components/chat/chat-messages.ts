import Block from '../../core/block';
import templateString from 'bundle-text:./chat-messages.hbs';

export class ChatMessages extends Block {
  constructor(props: any) {
    super(props);
  }

  static get componentName() {
    return 'ChatMessages';
  }

  render() {
    return templateString as unknown as string;
  }
}
