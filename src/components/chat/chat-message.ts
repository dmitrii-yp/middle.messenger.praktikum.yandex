import Block from '../../core/block';
import templateString from 'bundle-text:./chat-message.hbs';

export type ChatMessageProps = {
  text: string;
  time: string;
  isMyMessage?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  static get componentName() {
    return 'ChatMessage';
  }

  render() {
    return templateString as unknown as string;
  }
}
