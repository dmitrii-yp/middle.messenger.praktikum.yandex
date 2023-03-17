import Block from '../../core/block';
import templateString from 'bundle-text:./new-chat-button.hbs';

interface NewChatButtonProps {
  events: {
    click: () => void;
  };
  onClick: () => void;
}

export class NewChatButton extends Block<NewChatButtonProps> {
  constructor(props: NewChatButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  static get componentName() {
    return 'NewChatButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
