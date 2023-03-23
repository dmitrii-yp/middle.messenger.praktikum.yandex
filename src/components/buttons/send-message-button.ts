import Block from '../../core/block';
import templateString from 'bundle-text:./send-message-button.hbs';


export class SendMessageButton extends Block {
  constructor() {
    super();
  }

  static get componentName() {
    return 'SendMessageButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
