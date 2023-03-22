import Block from '../../core/block';
import templateString from 'bundle-text:./topbar.hbs';
import { Chat } from '../../typings/api-types';

interface ChatTopBarProps {
  title: string;
  avatar: string;
  onChatSettingsClick: () => void;
  onChatSettingsCloseClick: (e: MouseEvent) => void;
}

export class ChatTopBar extends Block<ChatTopBarProps> {
  constructor(props: any) {
    super(props);

    const targetChat = props.chats.data.find(
      (chat: Chat) => chat.id === props.chats.activeChatId
    );

    if (targetChat) {
      this.setProps({ title: targetChat.title, avatar: targetChat.avatar });
    }
  }

  static get componentName() {
    return 'ChatTopBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
