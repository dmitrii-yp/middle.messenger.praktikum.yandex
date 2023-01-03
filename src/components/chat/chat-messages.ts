import Block from '../../core/block';
import templateString from 'bundle-text:./chat-messages.hbs';
import { ChatMessagesData } from '../../mocks/chat-messages';

export class ChatMessages extends Block {
  constructor(props: any) {
    super({ ...props, ...ChatMessagesData });
  }

  static get componentName() {
    return 'ChatMessages';
  }

  render() {
    return templateString as unknown as string;
  }
}
