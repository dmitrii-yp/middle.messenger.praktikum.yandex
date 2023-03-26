import Block from '../../core/block';
import templateString from './chat-settings-button.hbs';

interface ChatSettingsButtonProps {
  onClick: () => void;
}

export class ChatSettingsButton extends Block {
  constructor({ onClick }: ChatSettingsButtonProps) {
    super({
      events: {
        click: onClick,
      },
    });
  }

  static get componentName() {
    return 'ChatSettingsButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
