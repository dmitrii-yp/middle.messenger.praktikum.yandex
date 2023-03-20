import Block from '../../core/block';
import templateString from 'bundle-text:./send-message-button.hbs';


export class SendMessageButton extends Block {
  constructor(props: any = {}) {
    super(props);
  }

  static get componentName() {
    return 'SendMessageButton';
  }

  render() {
    console.log(`SendMessageButton`);

    return templateString as unknown as string;
  }
}
