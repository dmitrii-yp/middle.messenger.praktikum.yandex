import Block from '../../core/block';
import templateString from 'bundle-text:./input-block.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

interface InputBlockProps {
  onBlur: (e: FocusEvent) => void;
  name: string;
  value: string;
  type?: string;
  label: string;
  error: string;
}

export class InputBlock extends Block {
  constructor(props: InputBlockProps) {
    super(props);
    this.setProps({
      onBlur: (e: FocusEvent) => this.onBlur(e),
    });
  }

  static get componentName() {
    return 'InputBlock';
  }

  onBlur(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.value === '') {
      this.setProps({ value: '', error: '' });
      return;
    }

    const errors = validateForm([
      { type: inputElement.name as InputType, value: inputElement.value },
    ]);

    if (errors[inputElement.name]) {
      this.setProps({
        ...this.props,
        value: inputElement.value,
        error: errors[inputElement.name],
      });
    } else {
      this.setProps({
        ...this.props,
        value: inputElement.value,
        error: '',
      });
    }
  }

  render() {
    return templateString as unknown as string;
  }
}
