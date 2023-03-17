import Block from '../../core/block';
import templateString from 'bundle-text:./chat-preview.hbs';
import ChatController from '../../controllers/chat-controller';
import { withStore } from '../../hocs/with-store';
import { State } from '../../typings/store-types';

interface ChatPreviewProps {
  message: string;
  name: string;
  messageCount?: number;
  time: string;
  id: number;
  active: boolean;
  activeChatId: number;
}

class ChatPreviewBase extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super(props);
    this.setProps({
      ...props,
      active: props.id === props.activeChatId,
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

export const ChatPreview = withStore((state: State) => ({
  activeChatId: state?.chats?.activeChatId,
}))(ChatPreviewBase as typeof Block);
