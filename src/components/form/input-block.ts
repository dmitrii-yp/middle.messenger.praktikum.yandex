import Block from '../../core/block';
import templateString from 'bundle-text:./input-label.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

interface InputBlockProps {
  onBlur: (e: FocusEvent) => void;
  login: string;
  password: string;
  errors: {
    login: string;
    password: string;
  };
  children: any;
}

export class InputLabel extends Block {
  constructor(props: InputBlockProps) {
    super(props);
  }

  static get componentName() {
    return 'InputLabel';
  }

  onBlur(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    const errors = validateForm([
      { type: inputElement.name as InputType, value: inputElement.value },
    ]);

    if (errors[inputElement.name]) {
      this.setProps({
        ...this.props,
        [inputElement.name]: inputElement.value,
        errors: {
          ...this.props.errors,
          [inputElement.name]: errors[inputElement.name],
        },
      });
    } else {
      this.setProps({
        ...this.props,
        [inputElement.name]: inputElement.value,
        errors: {
          ...this.props.errors,
          [inputElement.name]: '',
        },
      });
    }
  }

  render() {
    return templateString as unknown as string;
  }
}
