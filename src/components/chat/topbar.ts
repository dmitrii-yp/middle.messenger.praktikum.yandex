import Block from '../../core/block';
import templateString from 'bundle-text:./topbar.hbs';
import { Chat } from '../../typings/api-types';

interface ChatTopBarProps {
  chats: {
    data: Chat;
    activeChatId: number;
  };
  modals: {
    chatSettings: boolean;
  };
  title: string;
  onChatSettingsClick: () => void;
  onChatSettingsCloseClick: (e: MouseEvent) => void;
}

export class ChatTopBar extends Block<ChatTopBarProps> {
  constructor(props: any) {
    super({
      ...props,
      modals: {
        chatSettings: false,
      },
    });

    const title = props.chats.data.find(
      (chat: Chat) => chat.id === props.chats.activeChatId
    )?.title;

    if (title) {
      this.setProps({
        title,
        onChatSettingsClick: () => this.onChatSettingsClick(),
        onChatSettingsCloseClick: (e: MouseEvent) =>
          this.onChatSettingsCloseClick(e),
      });
    }
  }

  onChatSettingsClick() {
    this.setProps({
      ...this.props,
      modals: {
        chatSettings: true,
      },
    });
  }

  onChatSettingsCloseClick(e: MouseEvent) {
    // console.log(e.target);
    // if (!(e.target as HTMLElement).closest('.chat-edit-modal')) {
    //   this.setProps({
    //     ...this.props,
    //     modals: {
    //       chatSettings: false,
    //     },
    //   });
    // }
    this.setProps({
        ...this.props,
        modals: {
          chatSettings: false,
        },
      });
  }

  static get componentName() {
    return 'ChatTopBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
