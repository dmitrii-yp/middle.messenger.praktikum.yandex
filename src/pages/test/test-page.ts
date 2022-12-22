import Block from '../../core/block';
import templateString from 'bundle-text:./test-page.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

type LoginPageProps = {
  onClick: (e: MouseEvent) => void;
  // onBlur: (e: FocusEvent) => void;
  login: string;
  password: string;
  errors: {
    login: string;
    password: string;
  };
};

export class TestPage extends Block<LoginPageProps> {
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
