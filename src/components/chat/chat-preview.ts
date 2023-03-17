import Block from '../../core/block';
import templateString from 'bundle-text:./chat-preview.hbs';
import ChatController from '../../controllers/chat-controller';

interface ChatPreviewProps {
  message: string;
  name: string;
  messageCount?: number;
  time: string;
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super(props);
    this.setProps({
      events: {
        click: () => this.onClick(),
      },
    });
    console.log(this.props);
  }

  static get componentName() {
    return 'ChatPreview';
  }

  onClick() {
    console.log(1);

    ChatController.setActvieChatId(this.props.id);
  }

  render() {
    return templateString as unknown as string;
  }
}
