export enum InputType {
  LOGIN = 'login',
  PASSWORD = 'password',
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  DISPLAY_NAME = 'display_name',
  PHONE = 'phone',
  REPEAT_PASSWORD = 'repeat_password',
  MESSAGE = 'message',
}

type InputData = {
  value: string;
  type: InputType;
};

type Assertion = (value: string) => boolean | string;

const Assertions: Record<InputType, Assertion[]> = {
  login: [
    (value: string) => value.length < 3 && 'At least 3 characters',
    (value: string) => value.length > 20 && 'No more than 20 characters',
    (value: string) =>
      !/^[a-zA-Z0-9-_]+$/.test(value) && 'Only latin letters, numbers, and -_',
    (value: string) =>
      /^[0-9]+$/.test(value) && "Can't consist only of numbers",
    (value: string) => !value && 'Login is required',
  ],
  password: [
    (value: string) => value.length < 8 && 'At least 8 characters',
    (value: string) => value.length > 40 && 'No more than 20 characters',
    (value: string) => !/[A-Z]/.test(value) && 'At least one uppercase letter',
    (value: string) => !/[a-z]/.test(value) && 'At least one lowercase letter',
    (value: string) => !/[0-9]/.test(value) && 'At least one number',
    (value: string) => !value && 'Password is required',
  ],
  repeat_password: [(value: string) => !value && 'Password repeat is required'],
  email: [
    (value: string) =>
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) &&
      'Invalid email',
    (value: string) => !value && 'Email is required',
  ],
  first_name: [
    (value: string) =>
      !/^[A-ZА-ЯË]{1}/.test(value) && 'First letter must be uppercase',
    (value: string) =>
      !/^[А-ЯËа-яёA-Za-z-]+$/.test(value) &&
      'Only latin, cyrillic and "-" allowed',
    (value: string) => !value && 'First name is required',
  ],
  second_name: [
    (value: string) =>
      !/^[A-ZА-ЯË]{1}/.test(value) && 'First letter must be uppercase',
    (value: string) =>
      !/^[А-ЯËа-яёA-Za-z-]+$/.test(value) &&
      'Only latin, cyrillic and "-" allowed',
    (value: string) => !value && 'Second name is required',
  ],
  display_name: [
    (value: string) =>
      !/^[A-ZА-ЯË]{1}/.test(value) && 'First letter must be uppercase',
    (value: string) =>
      !/^[А-ЯËа-яёA-Za-z-]+$/.test(value) &&
      'Only latin, cyrillic and "-" allowed',
    (value: string) => !value && 'Display name is required',
  ],
  phone: [
    (value: string) => value.length < 10 && 'At least 10 digits',
    (value: string) => value.length > 15 && 'No more than 15 digits',
    (value: string) =>
      !/^\+{0,1}[0-9]+$/.test(value) && 'Only numbers and "+" allowed',
    (value: string) => !value && 'Phone number is required',
  ],
  message: [(value: string) => !value && 'Message is required'],
};

export const validateForm = (inputData: InputData[]) => {
  const errors: Record<string, string> = {};

  inputData.forEach((input) => {
    const { value, type } = input;

    Assertions[type].forEach((assertion) => {
      const error = assertion(value);
      if (typeof error === 'string') {
        errors[type] = error;
      }
    });
  });

  if (inputData.some((input) => input.type === InputType.REPEAT_PASSWORD)) {
    const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

    const repeatPassword = inputData.find(
      (input) => input.type === InputType.REPEAT_PASSWORD
    )?.value;

    if (password !== repeatPassword) {
      errors[InputType.REPEAT_PASSWORD] = 'Passwords do not match';
    }
  }

  return errors;
};

