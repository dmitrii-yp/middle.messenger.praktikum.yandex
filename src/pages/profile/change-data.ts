import Block from '../../core/block';
import templateString from 'bundle-text:./change-data.hbs';
import { validateForm, InputType } from '../../helpers/validate-form';

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

export class ChangeDataPage extends Block<ChangeDataPageProps> {
  constructor(props: any) {
    super(props);

    this.setProps({
      login: 'stan_g',
      email: 'stanly.goodspeed@gmail.com',
      first_name: 'Stanly',
      second_name: 'Goodspeed',
      display_name: 'Stanly G',
      phone: '+12349999999',
      onClick: () => this.onClick(),
      errors: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
    });
  }

  onClick() {
    const allInputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
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
    }, {} as Indexed<string>);

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
