import Block from '../../core/block';
import templateString from 'bundle-text:./sign-in.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

type InputFields = {
  login: string;
  password: string;
};

interface SignInPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
};

export class SignInPage extends Block<SignInPageProps> {
  constructor(props: any) {
    super(props);

    this.setProps({
      onClick: () => this.onClick(),
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
