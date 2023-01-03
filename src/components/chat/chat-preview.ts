import Block from '../../core/block';
import templateString from 'bundle-text:./chat-preview.hbs';

interface ChatPreviewProps {
  message: string;
  name: string;
  messageCount?: number;
  time: string;
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super(props);
  }

  static get componentName() {
    return 'ChatPreview';
  }

  render() {
    return templateString as unknown as string;
  }
}
