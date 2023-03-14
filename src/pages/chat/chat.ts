import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';

export class ChatPage extends Block {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return templateString as unknown as string;
  }
}
