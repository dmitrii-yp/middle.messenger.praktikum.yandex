import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';

const ProfileData = {
  data: [
    {
      label: 'Login',
      value: 'stan_g',
    },
    {
      label: 'Email',
      value: 'stanly.goodspeed@gmail.com',
    },
    {
      label: 'Name',
      value: 'Stanly',
    },
    {
      label: 'Surname',
      value: 'Goodspeed',
    },
    {
      label: 'Name in chat',
      value: 'Stanly G',
    },
    {
      label: 'Phone',
      value: '+12349999999',
    },
  ],
};


export class ProfilePage extends Block {
  constructor(props: any) {
    super({ ...props, ...ProfileData });
  }

  render() {
    return templateString as unknown as string;
  }
}
