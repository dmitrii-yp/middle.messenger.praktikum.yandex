import Block from '../../core/block';
import templateString from 'bundle-text:./chat-messages.hbs';
import { withMessages } from '../../hocs/with-messages';
import { withUser } from '../../hocs/with-user';

class ChatMessagesBase extends Block {
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

export const ChatMessages = withUser(
  withMessages(ChatMessagesBase as typeof Block) as typeof Block
);
