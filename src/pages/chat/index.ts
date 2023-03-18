import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import ChatController from '../../controllers/chat-controller';
import { InputType, validateForm } from '../../helpers/validate-form';
import Store from '../../core/store';

interface ChatPageProps {
  modals: {
    newChat: boolean;
    chatEdit: boolean;
    chatAvatarUpload: boolean;
    addUsers: boolean;
    deleteUsers: boolean;
  };
  errors: {
    chat_title: string;
    chatSettings: string;
  };
  onNewChatButtonClick: () => void;
  onCreateNewChatClick: () => void;
  onChatSettingsClick: () => void;
  onModalCancelClick: () => void;
  onEmptySpaceClick: () => void;
}

export class ChatPage extends Block<ChatPageProps> {
  constructor(props: any = {}) {
    super({
      ...props,
      modals: {
        newChat: false,
        chatEdit: false,
        chatAvatarUpload: false,
        addUsers: false,
        deleteUsers: false,
      },
      onNewChatButtonClick: () => this.onNewChatButtonClick(),
      onCreateNewChatClick: (e: MouseEvent) => this.onCreateNewChatClick(e),
      onChatSettingsClick: () => this.onChatSettingsClick(),
      onModalCancelClick: () => this.onModalCancelClick(),
      onEmptySpaceClick: (e: MouseEvent) => this.onEmptySpaceClick(e),
    });
    console.log('Rerender', JSON.stringify(this.props));

    ChatController.getChats();
  }

  onNewChatButtonClick() {
    this.setProps({
      modals: {
        ...this.props.modals,
        newChat: true,
      },
    });
  }

  onChatSettingsClick() {
    this.setProps({
      modals: {
        ...this.props.modals,
        chatEdit: true,
      },
    });
  }

  onDeleteChatClick() {
    this.setProps({
      modals: {
        ...this.props.modals,
        chatSettings: false,
      },
    });
  }

  onModalCancelClick() {
    this.setProps({
      modals: {
        newChat: false,
        chatSettings: false,
        chatAvatarUpload: false,
        addUsers: false,
        deleteUsers: false,
      },
    });
  }

  onEmptySpaceClick(e: MouseEvent) {
    if (!(e.target as HTMLElement).closest('.modal')) {
      this.setProps({
        modals: {
          newChat: false,
          chatSettings: false,
          chatAvatarUpload: false,
          addUsers: false,
          deleteUsers: false,
        },
      });
    }
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
        errors,
      });

      return;
    }

    const error = await ChatController.createChat(chatTitle);

    if (error) {
      this.setProps({
        errors: {
          chat_title: error,
        },
      });
      return;
    }

    this.setProps({
      modals: {
        ...this.props.modals,
        newChat: false,
      },
    });
  }

  render() {
    Store.deleteAllListeners();
    return templateString as unknown as string;
  }
}
