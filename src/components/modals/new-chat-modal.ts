import Block from '../../core/block';
import templateString from 'bundle-text:./new-chat-modal.hbs';

interface NewChatModalProps {
  onNewChatCancelClick: () => void;
  onCreateNewChatClick: () => void;
    onCreateChatClick: () => void;
}

export class NewChatModal extends Block<NewChatModalProps> {
  constructor(props: NewChatModalProps) {
    super(props);
  }

  static get componentName() {
    return 'NewChatModal';
  }

  render() {
    return templateString as unknown as string;
  }
}
