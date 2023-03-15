import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import { withUser } from '../../hocs/with-user';
import Store from '../../core/store';

class ProfilePageBase extends Block {
  constructor(props: any = {}) {
    console.log(Store.getState());

    super(props);
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ProfilePage = withUser(ProfilePageBase as typeof Block);
