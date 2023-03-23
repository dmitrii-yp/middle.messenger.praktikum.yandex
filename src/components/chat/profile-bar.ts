import Block from '../../core/block';
import templateString from 'bundle-text:./profile-bar.hbs';


export class ChatProfileBar extends Block {
  constructor() {
    super();
  }

  static get componentName() {
    return 'ChatProfileBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
