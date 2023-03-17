import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar.hbs';
import { ChatsPreviewsData } from '../../mocks/chat-previews';
import { withChats } from '../../hocs/with-chats';

type DataBit = {
  name: string;
  message: string;
  time: string;
  messageCount?: string;
};

interface ChatSideBarProps {
  data: DataBit[];
}

class ChatSideBarBase extends Block {
  constructor(props: ChatSideBarProps) {
    super({ ...props, ...ChatsPreviewsData });
  }

  static get componentName() {
    return 'ChatSideBar';
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChatSideBar = withChats(ChatSideBarBase as typeof Block);
