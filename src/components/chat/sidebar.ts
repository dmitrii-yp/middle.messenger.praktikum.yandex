import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar.hbs';
import { withChats } from '../../hocs/with-chats';

type ChatData = {
  name: string;
  message: string;
  time: string;
  messageCount?: string;
  id: number;
};

interface ChatSideBarProps {
  data: ChatData[];
}

class ChatSideBarBase extends Block {
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
