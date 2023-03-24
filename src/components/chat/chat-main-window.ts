import Block from '../../core/block';
import templateString from 'bundle-text:./chat-main-window.hbs';
import { withChats } from '../../hocs/with-chats';

interface ChatMainWindowProps {
  onChatSettingsButtonClick: () => void;
};

class ChatMainWindowBase extends Block<ChatMainWindowProps> {
  constructor(props: ChatMainWindowProps) {
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
