import Block from '../../core/block';
import templateString from 'bundle-text:./input-text.hbs';

interface InputTextProps {
  name: string;
  type: string;
  error?: string;
  value?: string;
  onBlur: (e: FocusEvent) => void;
}

export class InputText extends Block {
  constructor(props: InputTextProps) {
    super({ ...props, events: { blur: props.onBlur } });
    const inputElement = this._element as HTMLInputElement;
    if (props.error) {
      inputElement.setCustomValidity(props.error);
      return;
    }
    inputElement.setCustomValidity('');
  }

  static get componentName() {
    return 'InputText';
  }

  render() {
    return templateString as unknown as string;
  }
}
