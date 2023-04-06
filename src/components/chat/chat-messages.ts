import Block from '../../core/block';
import templateString from './chat-messages.hbs';
import { withMessages } from '../../hocs/with-messages';
import { withUser } from '../../hocs/with-user';
import { ChatsState } from '../../typings/store-types';

interface ChatMessagesProps {
  chats: ChatsState;
}

class ChatMessagesBase extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
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
