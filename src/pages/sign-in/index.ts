import Block from '../../core/block';
import templateString from 'bundle-text:./sign-in.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';
import AuthController from '../../controllers/auth-controller';
import { SigninData } from '../../api/types';

type InputFields = {
  login: string;
  password: string;
};

interface SignInPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
}

export class SignInPage extends Block<SignInPageProps> {
  constructor(props: any = {}) {
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

    const data = inputData.reduce(
      (acc, data) => Object.assign(acc, { [data.type]: data.value }),
      {}
    );

    // In case of error
    if (Object.values(errors).length !== 0) {
      this.setProps({
        ...this.props,
        ...data,
        errors,
      });

      console.log(inputData) ;
      return;
    }

    AuthController.signin(data as SigninData);
  }

  render() {
    return templateString as unknown as string;
  }
}
