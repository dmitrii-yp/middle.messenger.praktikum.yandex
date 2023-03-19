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
    addUser: boolean;
    deleteUsers: boolean;
  };
  errors: {
    chat_title: string;
    add_user: string;
  };
  onNewChatButtonClick: () => void;
  onChatSettingsButtonClick: () => void;
  onCreateNewChatSubmit: () => void;
  onAddUserClick: () => void;
  onAddUserSubmit: () => void;
  onDeleteChatClick: () => void;
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
        addUser: false,
        deleteUsers: false,
      },
      onNewChatButtonClick: () => this.onNewChatButtonClick(),
      onChatSettingsButtonClick: () => this.onChatSettingsButtonClick(),
      onCreateNewChatSubmit: (e: MouseEvent) => this.onCreateNewChatSubmit(e),
      onAddUserClick: () => this.onAddUserClick(),
      onAddUserSubmit: () => this.onAddUserSubmit(),
      onDeleteChatClick: () => this.onDeleteChatClick(),
      onModalCancelClick: () => this.onModalCancelClick(),
      onEmptySpaceClick: (e: MouseEvent) => this.onEmptySpaceClick(e),
    });
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

  onChatSettingsButtonClick() {
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
        chatEdit: false,
      },
    });
    ChatController.setActiveChatId(null);
  }

  onAddUserClick() {
    this.setProps({
      modals: {
        ...this.props.modals,
        chatEdit: false,
        addUser: true,
      },
    });
  }

  onModalCancelClick() {
    this.setProps({
      modals: {
        newChat: false,
        chatSettings: false,
        chatAvatarUpload: false,
        addUser: false,
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
          addUser: false,
          deleteUsers: false,
        },
      });
    }
  }

  async onCreateNewChatSubmit(e: MouseEvent) {
    e.preventDefault();

    const chatTitle = (
      document.querySelector('input[name="chat_title"]') as HTMLInputElement
    ).value;

    const validationErrors = validateForm([
      { type: 'chat_title' as InputType, value: chatTitle },
    ]);

    if (Object.values(validationErrors).length !== 0) {
      this.setProps({
        errors: validationErrors,
      });

      return;
    }

    const APIError = await ChatController.createChat(chatTitle);

    if (APIError) {
      this.setProps({
        errors: {
          chat_title: APIError,
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

  async onAddUserSubmit() {
    this.setProps({
      modals: {
        ...this.props.modals,
        addUser: false,
      },
    });
  }

  render() {
    Store.deleteAllListeners();
    return templateString as unknown as string;
  }
}
