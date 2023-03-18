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
    chatSettings: string;
  };
  onNewChatButtonClick: () => void;
  onChatSettingsButtonClick: () => void;
  onCreateNewChatClick: () => void;
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
      onCreateNewChatClick: (e: MouseEvent) => this.onCreateNewChatClick(e),
      onAddUserClick: () => this.onAddUserClick(),
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
    console.log(this);

    this.setProps({
      modals: {
        ...this.props.modals,
        chatEdit: false,
        addUser: true,
      },
    });

    console.log(this.props.modals.addUser);
  }

  onAddUserSubmit(e: MouseEvent) {
    e.preventDefault();
    console.log('onAddUserSubmit');

    // const form = document.querySelector('form[name="add_user"]') as HTMLFormElement;
    // const formData = new FormData(form);
    // const login = formData.get('login') as string;
    // const errors = validateForm([
    //   { type: 'login' as InputType, value: login },
    // ]);
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
