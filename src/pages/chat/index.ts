import Block from '../../core/block';
import templateString from './chat.hbs';
import ChatController from '../../controllers/chat-controller';
import Store from '../../core/store';
import { InputType, validateForm } from '../../helpers/validate-form';
import { withUser } from '../../hocs/with-user';
import { withMessages } from '../../hocs/with-messages';

interface ChatPageProps {
  modals: {
    newChat: boolean;
    chatEdit: boolean;
    addUser: boolean;
    deleteUser: boolean;
  };
  errors: {
    chat_title: string;
  };
  onNewChatButtonClick: () => void;
  onChatSettingsButtonClick: () => void;
  onCreateNewChatSubmit: (e: MouseEvent) => void;
  onAddUserClick: () => void;
  onAddUserSubmit: () => void;
  onDeleteUserClick: () => void;
  onDeleteUserSubmit: () => void;
  onDeleteChatClick: () => void;
  onModalCancelClick: () => void;
  onEmptySpaceClick: (e: MouseEvent) => void;
}

class ChatPageBase extends Block<ChatPageProps> {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      modals: {
        newChat: false,
        chatEdit: false,
        addUser: false,
        deleteUser: false,
      },
      errors: {
        chat_title: '',
      },
      onNewChatButtonClick: () => this.onNewChatButtonClick(),
      onChatSettingsButtonClick: () => this.onChatSettingsButtonClick(),
      onCreateNewChatSubmit: (e: MouseEvent) => this.onCreateNewChatSubmit(e),
      onAddUserClick: () => this.onAddUserClick(),
      onAddUserSubmit: () => this.onAddUserSubmit(),
      onDeleteUserClick: () => this.onDeleteUserClick(),
      onDeleteUserSubmit: () => this.onDeleteUserSubmit(),
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

  onDeleteUserClick() {
    this.setProps({
      modals: {
        ...this.props.modals,
        chatEdit: false,
        deleteUser: true,
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
        errors: {
          chat_title: validationErrors.chat_title,
        },
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

  async onDeleteUserSubmit() {
    this.setProps({
      modals: {
        ...this.props.modals,
        deleteUser: false,
      },
    });
  }

  render() {
    Store.deleteAllListeners();
    return templateString as unknown as string;
  }
}

export const ChatPage = withMessages(
  withUser(ChatPageBase as typeof Block) as typeof Block
);
