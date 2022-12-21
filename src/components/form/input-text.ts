import Block from '../../core/block';
import templateString from 'bundle-text:./input-text.hbs';
// import { validateForm, InputType } from '../../helpers/validate-form';

interface InputTextProps {
  inputName: string;
  inputType: string;
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
      // setTimeout(function () {
      //   inputElement.focus();
      //   inputElement.selectionStart = inputElement.selectionEnd = 10000;
      // }, 0);
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
