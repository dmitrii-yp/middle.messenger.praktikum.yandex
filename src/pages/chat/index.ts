import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import ChatController from '../../controllers/chat-controller';

interface ChatPageProps {
  modals: {
    newChat: boolean;
  };
  onNewChatClick: () => void;
  onNewChatCancelClick: () => void;
}

export class ChatPage extends Block {
  constructor(props: any = {}) {
    super({
      ...props,
      modals: {
        newChat: false,
      },
      onNewChatClick: () => this.onNewChatClick(),
      onNewChatCancelClick: () => this.onNewChatCancelClick(),
    });
    ChatController.getChats();
  }

  onNewChatClick() {
    this.setProps({
      ...this.props,
      modals: {
        newChat: true,
      },
    });
  }

  onNewChatCancelClick() {
    this.setProps({
      ...this.props,
      modals: {
        newChat: false,
      },
    });
  }

  render() {
    return templateString as unknown as string;
  }
}
