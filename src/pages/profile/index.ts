import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import UserController from '../../controllers/user-controller';
import { withUser } from '../../hocs/with-user';

interface ProfilePageProps {
  upload_modal: boolean;
  onUploadClick: (e: MouseEvent) => void;
  onUploadCancelClick: () => void;
  onAvatarPicClick: () => void;
  errors: {
    uploadAPIError: string;
  };
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: any = {}) {
    super(props);
    this.setProps({
      onUploadClick: async (e: MouseEvent) => await this.onUploadClick(e),
      onUploadCancelClick: () => this.onUploadCancelClick(),
      onAvatarClick: () => this.onAvatarClick(),
      upload_modal: false,
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

  onAvatarClick() {
    this.setProps({
      ...this.props,
      upload_modal: true,
    });
  }

  onUploadCancelClick() {
    this.setProps({
      ...this.props,
      upload_modal: false,
    });
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ProfilePage = withUser(ProfilePageBase as typeof Block);
