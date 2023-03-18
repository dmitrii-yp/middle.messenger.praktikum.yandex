import Block from '../../core/block';
import templateString from 'bundle-text:./chat-edit-modal.hbs';
import ChatController from '../../controllers/chat-controller';

interface ChatEditModalProps {
  onDeleteChatClick: () => void;
  error: string
}

export class ChatEditModal extends Block {
  constructor(props: ChatEditModalProps) {
    super(props);
    this.setProps({
      events: {
        click: this.onDeleteChatClick,
      },
    });
  }

  async onDeleteChatClick() {
    const error = await ChatController.deleteChat(this.props.activeChatId);

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
