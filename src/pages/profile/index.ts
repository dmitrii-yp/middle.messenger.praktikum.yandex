import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import { withUser } from '../../hocs/with-user';
import UserController from '../../controllers/user-controller';

interface ProfilePageProps {
  upload_disabled: boolean;
  onUploadClick: (e: MouseEvent) => void;
  errors: {
    uploadAPIError: string;
  };
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: any = {}) {
    super(props);

    this.setProps({
      onUploadClick: async (e: MouseEvent) => await this.onUploadClick(e),
      upload_disabled: true,
      errors: {
        uploadAPIError: '',
      },
    });
  }

  async onUploadClick(e: MouseEvent) {
    e.preventDefault();
    const fileInput = document.querySelector(
      'input[name="avatar"]'
    ) as HTMLInputElement;

    const file = fileInput.files?.[0];

    if (!file) {
      this.setProps({
        ...this.props,
        errors: {
          uploadAPIError: 'No file selected',
        },
      });

      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const APIError = await UserController.changeAvatar(formData);

    if (APIError) {
      this.setProps({
        ...this.props,
        errors: {
          uploadAPIError: APIError,
        },
      });

      return;
    }
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ProfilePage = withUser(ProfilePageBase as typeof Block);
