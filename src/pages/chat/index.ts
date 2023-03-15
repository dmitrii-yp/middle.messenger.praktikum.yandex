import Block from '../../core/block';
import templateString from 'bundle-text:./chat.hbs';
import { withStore } from '../../hocs/with-store';

class ChatPageBase extends Block {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChatPage = withStore((state) => {
  return { ...state.user.data } || {};
})(ChatPageBase as typeof Block);
