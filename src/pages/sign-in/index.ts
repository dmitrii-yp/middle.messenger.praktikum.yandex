import Block from '../../core/block';
import templateString from 'bundle-text:./sign-in.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';
import AuthController from '../../controllers/auth-controller';
import { SigninData } from '../../typings/api-types';
import { withStore } from '../../hocs/with-store';

type InputFields = {
  login: string;
  password: string;
};

interface SignInPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
}

class SignInPageBase extends Block<SignInPageProps> {
  constructor(props: any = {}) {
    super(props);

    this.setProps({
      onClick: async (e: MouseEvent) => await this.onClick(e),
      login: '',
      password: '',
      errors: {
        login: '',
        password: '',
        auth: '',
      },
    });
  }

  async onClick(e: MouseEvent) {
    e.preventDefault();
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

    // In case of validation error
    if (Object.values(errors).length !== 0) {
      this.setProps({
        ...this.props,
        ...data,
        errors,
      });

      return;
    }

    const authErrorMessage = await AuthController.signin(data as SigninData);

    if (authErrorMessage) {
      this.setProps({
        ...this.props,
        ...data,
        ...{
          errors: {
            auth: authErrorMessage,
          },
        },
      });
    }
  }

  render() {
    return templateString as unknown as string;
  }
}

export const SignInPage = withStore((state) => {
  return { ...state.user.data } || {};
})(SignInPageBase as typeof Block);
