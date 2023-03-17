import Block from '../../core/block';
import templateString from 'bundle-text:./chat-main-window.hbs';
import { withChats } from '../../hocs/with-chats';

class ChatMainWindowBase extends Block {
  constructor(props: any) {
    super(props);
  }

  static get componentName() {
    return 'ChatMainWindow';
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChatMainWindow = withChats(ChatMainWindowBase as typeof Block);
