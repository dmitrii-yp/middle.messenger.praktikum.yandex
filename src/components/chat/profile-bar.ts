import Block from '../../core/block';
import templateString from './profile-bar.hbs';

interface ChatProfileBarProps {
  searchQuery: string;
}

export class ChatProfileBar extends Block<ChatProfileBarProps> {
  constructor(props: ChatProfileBarProps) {
    super(props);
  }

  static get componentName() {
    return 'ChatProfileBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
