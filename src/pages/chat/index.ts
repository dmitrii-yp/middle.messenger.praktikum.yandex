import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import ChatController from '../../controllers/chat-controller';

export class ChatPage extends Block {
  constructor(props: any = {}) {
    super(props);
    ChatController.getChats();
  }

  render() {
    return templateString as unknown as string;
  }
}
