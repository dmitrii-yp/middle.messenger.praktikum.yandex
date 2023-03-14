import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import { ProfileData } from '../../mocks/profile-data';
import { withStore } from '../../core/store';

class ProfilePageBase extends Block {
  constructor(props: any = {}) {
    super({ ...props, ...ProfileData });
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ProfilePage = withStore((state) => {
  return {...state.user.data} || {}
})(ProfilePageBase as typeof Block);
