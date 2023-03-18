import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import ChatController from '../../controllers/chat-controller';
import { InputType, validateForm } from '../../helpers/validate-form';

interface ChatPageProps {
  modals: {
    newChat: boolean;
  };
  errors: {
    chat_title: string;
  };
  onNewChatButtonClick: () => void;
  onNewChatCancelClick: () => void;
  onCreateNewChatClick: () => void;
}

export class ChatPage extends Block<ChatPageProps> {
  constructor(props: any = {}) {
    super({
      ...props,
      modals: {
        newChat: false,
      },
      onNewChatButtonClick: () => this.onNewChatButtonClick(),
      onNewChatCancelClick: () => this.onNewChatCancelClick(),
      onCreateNewChatClick: (e: MouseEvent) => this.onCreateNewChatClick(e),
    });
    ChatController.getChats();
  }

  onNewChatButtonClick() {
    this.setProps({
      ...this.props,
      modals: {
        newChat: true,
      },
    });
  }

  async onCreateNewChatClick(e: MouseEvent) {
    e.preventDefault();

    const chatTitle = (
      document.querySelector('input[name="chat_title"]') as HTMLInputElement
    ).value;

    const errors = validateForm([
      { type: 'chat_title' as InputType, value: chatTitle },
    ]);

    if (Object.values(errors).length !== 0) {
      this.setProps({
        ...this.props,
        errors,
      });

      return;
    }

    const error = await ChatController.createChat(chatTitle);

    if (error) {
      this.setProps({
        ...this.props,
        errors: {
          chat_title: error,
        },
      });
      return;
    }

    this.setProps({
      ...this.props,
      modals: {
        newChat: false,
      },
    });
  }

  onNewChatCancelClick() {
    this.setProps({
      ...this.props,
      modals: {
        newChat: false,
      },
    });
  }

  render() {
    return templateString as unknown as string;
  }
}
