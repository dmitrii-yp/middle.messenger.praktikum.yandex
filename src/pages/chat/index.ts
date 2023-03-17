import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import ChatController from '../../controllers/chat-controller';

interface ChatPageProps {
  modals: {
    newChat: boolean;
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

    //validateTitle
    const chatTitle = (document.querySelector('input[name="chat_title"]') as HTMLInputElement).value;

    const error = await ChatController.createChat(chatTitle);
    if (error) {
      //set error
    }
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
