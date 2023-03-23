import Block from '../../core/block';
import templateString from 'bundle-text:./change-password.hbs';
import UserController from '../../controllers/user-controller';
import { validateForm, InputType } from '../../helpers/validate-form';
import { withStore } from '../../hocs/with-store';

type InputFields = {
  old_password: string;
  password: string;
  password_repeat?: string;
};

interface ChangePasswordPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
}

export class ChangePasswordPageBase extends Block<ChangePasswordPageProps> {
  constructor(props: ChangePasswordPageProps) {
    super(props);

    const newProps = {
      old_password: '',
      password: '',
      password_repeat: '',
    };

    this.setProps({
      ...newProps,
      onClick: (e: SubmitEvent) => this.onClick(e),
      errors: {
        ...newProps,
        API: '',
      },
    });
  }

  async onClick(e: SubmitEvent) {
    e.preventDefault();
    const allInputs = document.querySelectorAll(
      'input'
    ) as NodeListOf<HTMLInputElement>;
    const targetInputs = [...allInputs].filter(
      (input: HTMLInputElement) => input.name !== 'search'
    );
    const inputData = targetInputs.map((input) => ({
      type: input.name as InputType,
      value: input.value,
    }));

    const errors = validateForm(inputData);

    const data = {
      oldPassword: inputData[0].value,
      newPassword: inputData[1].value,
    };

    // In case of validation error
    if (Object.values(errors).length !== 0) {
           this.setProps({
        ...this.props,
        ...data,
        errors,
      });

      return;
    }

    const APIErrorMessage = await UserController.changePassword(data);

    if (APIErrorMessage) {
      this.setProps({
        ...this.props,
        ...{
          errors: {
            API: APIErrorMessage,
          },
        },
      });
    }
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ChangePasswordPage = withStore((state) => {
  return { ...state.user.data } || {};
})(ChangePasswordPageBase as typeof Block);
