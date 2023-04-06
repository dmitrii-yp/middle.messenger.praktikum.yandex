import Block from '../../core/block';
import templateString from './new-chat-modal.hbs';

interface NewChatModalProps {
  onModalCancelClick: () => void;
  onCreateNewChatClick: () => void;
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
