import Block from '../../core/block';
import templateString from 'bundle-text:./chat-edit-modal.hbs';

interface ChatEditModalProps {
  onNewChatCancelClick: () => void;
  onCreateNewChatClick: () => void;
  onCreateChatClick: () => void;
  onClick: (e: MouseEvent) => void;
}

export class ChatEditModal extends Block {
  constructor(props: ChatEditModalProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  static get componentName() {
    return 'ChatEditModal';
  }

  render() {
    return templateString as unknown as string;
  }
}
