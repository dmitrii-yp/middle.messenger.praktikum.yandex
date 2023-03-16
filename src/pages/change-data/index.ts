import Block from '../../core/block';
import templateString from 'bundle-text:./change-data.hbs';
import UserController from '../../controllers/user-controller';
import { validateForm, InputType } from '../../helpers/validate-form';
import { withUser } from '../../hocs/with-user';
import { User } from '../../typings/api-types';

type InputFields = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

interface ChangeDataPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
}

class ChangeDataPageBase extends Block<ChangeDataPageProps> {
  constructor(props: any = {}) {
    super(props);

    this.setProps({
      onClick: async (e: SubmitEvent) => await this.onClick(e),
      errors: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
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

    const data = inputData.reduce(
      (acc, data) => Object.assign(acc, { [data.type]: data.value }),
      {}
    );

    // In case of validation error
    if (Object.values(errors).length !== 0) {
      console.log(errors);

      this.setProps({
        ...this.props,
        ...data,
        errors,
      });

      return;
    }

    const APIErrorMessage = await UserController.changeData(
      data as Omit<User, 'id'>
    );

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

export const ChangeDataPage = withUser(ChangeDataPageBase as typeof Block);
