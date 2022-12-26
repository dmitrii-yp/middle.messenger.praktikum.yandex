import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import { ProfileData } from '../../mocks/profile-data';

export class ProfilePage extends Block {
  constructor(props: any) {
    super({ ...props, ...ProfileData });
  }

  render() {
    return templateString as unknown as string;
  }
}
