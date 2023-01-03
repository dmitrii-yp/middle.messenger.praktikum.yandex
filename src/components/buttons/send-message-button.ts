import Block from '../../core/block';
import templateString from 'bundle-text:./send-message-button.hbs';

interface SendMessageButtonProps {
  onClick: () => void;
}

export class SendMessageButton extends Block {
  constructor({ onClick }: SendMessageButtonProps) {
    super({
      events: {
        click: onClick,
      },
    });
  }

  static get componentName() {
    return 'SendMessageButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
