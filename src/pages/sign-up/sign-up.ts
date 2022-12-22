import Block from '../../core/block';
import templateString from 'bundle-text:./sign-up.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

type InputFields = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  password: string;
  repeat_password: string;
}

interface SignUpPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
};

export class SignUpPage extends Block<SignUpPageProps> {
  constructor(props: any) {
    super(props);

    this.setProps({
      onClick: () => this.onClick(),
      // onBlur: (e: FocusEvent) => this.onBlur(e),
      login: '',
      password: '',
      errors: {
        login: '',
        password: '',
      },
    });
  }

  onClick() {
    const inputs = document.querySelectorAll('input');
    const inputData = [...inputs].map((input) => ({
      type: input.name as InputType,
      value: input.value,
    }));

    const errors = validateForm(inputData);

    if (Object.values(errors).every((error) => !error)) {
      return;
    }

    const newProps = inputData.reduce((acc, data) => {
      acc[data.type] = data.value;
      return acc;
    }, {} as Record<string, string>);

    this.setProps({
      ...this.props,
      ...newProps,
      errors,
    });

    console.log(inputData);
  }

  render() {
    return templateString as unknown as string;
  }
}
