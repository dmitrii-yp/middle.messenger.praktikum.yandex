import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar.hbs';
import { withChats } from '../../hocs/with-chats';
import { ChatsState } from '../../typings/store-types';

interface ChatSideBarProps {
  chats: ChatsState
}

class ChatSideBarBase extends Block<ChatSideBarProps> {
  constructor(props: ChatSideBarProps) {
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
