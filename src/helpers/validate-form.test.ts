import { validateForm, InputType } from './validate-form';
import { expect } from 'chai';

describe('validateForm', () => {
  //Create new JSDOM input element
  let input: HTMLInputElement;

  before(() => {
    input = document.createElement('input');
    input.setAttribute('type', 'password');
    input.setAttribute('name', 'password');

    document.body.appendChild(input);
  });

  it('should return an empty object when no errors are present', () => {
    input.value = 'MyP@ssw0rd123';
    const inputData = [
      { value: 'johndoe', type: InputType.LOGIN },
      { value: 'MyP@ssw0rd123', type: InputType.PASSWORD },
      { value: 'MyP@ssw0rd123', type: InputType.REPEAT_PASSWORD },
      { value: 'john@example.com', type: InputType.EMAIL },
      { value: 'John', type: InputType.FIRST_NAME },
      { value: 'Doe', type: InputType.SECOND_NAME },
      { value: 'JohnDoe', type: InputType.DISPLAY_NAME },
      { value: '+1234567890', type: InputType.PHONE },
      { value: 'Hello, World!', type: InputType.MESSAGE },
    ];

    const errors = validateForm(inputData);

    expect(errors).to.be.an('object').that.is.empty;
  });

  it('should return an object with errors when invalid data is provided', () => {
    input.value = 'MyP@ssw';

    const inputData = [
      { value: 'j', type: InputType.LOGIN },
      { value: 'MyP@ssw', type: InputType.PASSWORD },
      { value: 'MyP@ssw0rd1234', type: InputType.REPEAT_PASSWORD },
      { value: 'invalidemail', type: InputType.EMAIL },
      { value: 'john', type: InputType.FIRST_NAME },
      { value: 'doe', type: InputType.SECOND_NAME },
      { value: 'johndoe123', type: InputType.DISPLAY_NAME },
      { value: '+1234', type: InputType.PHONE },
      { value: '', type: InputType.MESSAGE },
    ];

    const errors = validateForm(inputData);
    
    expect(errors).to.be.an('object').that.deep.includes({
      login: 'At least 3 characters',
      password: 'At least one number',
      repeat_password: 'Passwords do not match',
      email: 'Invalid email',
      first_name: 'First letter must be uppercase',
      second_name: 'First letter must be uppercase',
      display_name: 'Only latin, cyrillic and "-" allowed',
      phone: 'At least 10 digits',
      message: 'Message is required',
    });
  });
});
