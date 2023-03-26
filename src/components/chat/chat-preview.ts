import Block from '../../core/block';
import templateString from './chat-preview.hbs';
import ChatController from '../../controllers/chat-controller';

interface ChatPreviewProps {
  message: string;
  name: string;
  messageCount?: number;
  time: string;
  id: number;
  active: boolean;
  events: {
    click: () => void;
  };
}

export class ChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({
      ...props,
      events: {
        click: () => this.onClick(),
      },
    });
  }

  static get componentName() {
    return 'ChatPreview';
  }

  onClick() {
    ChatController.setActiveChatId(this.props.id);
  }

  render() {
    return templateString as unknown as string;
  }
}
