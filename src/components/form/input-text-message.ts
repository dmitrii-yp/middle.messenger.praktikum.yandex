import Block from '../../core/block';
import templateString from 'bundle-text:./input-text-message.hbs';

interface InputTextMessageProps {
  error?: string;
  value?: string;
}

export class InputTextMessage extends Block {
  constructor(props: InputTextMessageProps) {
    super(props);
    const inputElement = this._element as HTMLInputElement;
    if (props.error) {
      inputElement.setCustomValidity(props.error);
      return;
    }
    inputElement.setCustomValidity('');
  }

  static get componentName() {
    return 'InputTextMessage';
  }

  render() {
    return templateString as unknown as string;
  }
}
