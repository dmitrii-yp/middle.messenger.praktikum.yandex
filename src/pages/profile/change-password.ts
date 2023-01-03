import Block from '../../core/block';
import templateString from 'bundle-text:./change-password.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

type InputFields = {
  old_password: string;
  password: string;
  password_repeat: string;
};

interface ChangePasswordPageProps extends InputFields {
  onClick: (e: MouseEvent) => void;
  errors: InputFields;
}

export class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  constructor(props: any) {
    super(props);

    const newProps = {
      old_password: '',
      password: '',
      password_repeat: '',
    };

    this.setProps({
      ...newProps,
      onClick: () => this.onClick(),
      errors: {
        ...newProps,
      },
    });
  }

  onClick() {
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

    if (Object.values(errors).every((error) => !error)) {
      console.log(inputData);
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
