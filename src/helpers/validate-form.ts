export enum InputType {
  LOGIN = 'login',
  PASSWORD = 'password',
}

type InputData = {
  value: string;
  type: InputType;
};

export const validateForm = (inputData: InputData[]) => {
  const errors = {} as Record<string, string>;

  inputData.forEach((input) => {
    errors[input.type] = '';
  });

  inputData.forEach((input) => {
    if (input.type === InputType.LOGIN) {
      if (input.value.length < 3) {
        errors[input.type] = 'Login must be at least 3 characters';
      }

      if (input.value.length > 20) {
        errors[input.type] = 'Login must be no more than 20 characters';
      }

      if (!/^[a-zA-Z0-9]+$/.test(input.value)) {
        errors[input.type] = 'Only latin letters and numbers';
      }

      if (!input.value) {
        errors[input.type] = 'Login is required';
      }
    }

    if (input.type === InputType.PASSWORD) {
      if (!input.value) {
        errors[input.type] = 'Password is required';
      }

      if (input.value.length < 8) {
        errors[input.type] = 'Min 8 characters';
      }

      if (input.value.length > 40) {
        errors[input.type] = 'Max 20 characters';
      }

      if (!/[A-Z]/.test(input.value)) {
        errors[input.type] = 'At least one uppercase letter';
      }

      if (!/[a-z]/.test(input.value)) {
        errors[input.type] = 'At least one lowercase letter';
      }

      if (!/[0-9]/.test(input.value)) {
        errors[input.type] = 'At least one number';
      }
    }
  });

  return errors;
};
