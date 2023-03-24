import Block from '../../core/block';
import templateString from 'bundle-text:./sign-up.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';
import AuthController from '../../controllers/auth-controller';
import { SignupData } from '../../typings/api-types';

type InputFields = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  password: string;
  repeat_password?: string;
};

export class SignUpPage extends Block {
  constructor(props = {}) {
    const FormFields = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      password: '',
      repeat_password: '',
    };

    super({
      ...props,
      onClick: async (e: MouseEvent) => await this.onClick(e),
      ...FormFields,
      errors: {
        ...FormFields,
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
    ) as InputFields;

    // In case of error
    if (Object.values(errors).length !== 0) {
      this.setProps({
        ...this.props,
        ...data,
        errors,
      });

      return;
    }

    delete data.repeat_password;
    const authErrorMessage = await AuthController.signup(data as SignupData);

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
