import Block from '../../core/block';
import templateString from 'bundle-text:./chat-edit-modal.hbs';
import ChatController from '../../controllers/chat-controller';
import { withChats } from '../../hocs/with-chats';

interface ChatEditModalProps {
  onDeleteChatClick: () => void;
  error: string
}

class ChatEditModalBase extends Block {
  constructor(props: ChatEditModalProps) {
    super({...props});
    this.setProps({
      events: {
        click: () => this.onDeleteChatClick(),
      },
    });
  }

  async onDeleteChatClick() {
    const error = await ChatController.deleteChat(this.props.chats.activeChatId);

    if (error) {
      this.setProps({error});
      return;
    }

    this.props.onDeleteChatClick();
  }

  static get componentName() {
    return 'ChatEditModal';
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChatEditModal = withChats(ChatEditModalBase as typeof Block);
