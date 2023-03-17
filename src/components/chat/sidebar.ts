import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar.hbs';
import { withChats } from '../../hocs/with-chats';


class ChatSideBarBase extends Block {
  constructor(props: any = {}) {
    super(props);

  }

  static get componentName() {
    return 'ChatSideBar';
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChatSideBar = withChats(ChatSideBarBase as typeof Block);
