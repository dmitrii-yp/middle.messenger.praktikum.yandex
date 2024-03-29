import Block from '../../core/block';
import templateString from 'bundle-text:./profile.hbs';
import UserController from '../../controllers/user-controller';
import { withUser } from '../../hocs/with-user';

interface ProfilePageProps {
  modals: {
    uploadAvatar: boolean;
    newChat: boolean;
    chatSettings: boolean;
    chatAvatarUpload: boolean;
    addUser: boolean;
    deleteUsers: boolean;
  };
  onUploadClick: (e: MouseEvent) => void;
  onUploadCancelClick: () => void;
  onAvatarClick: () => void;
  onEmptySpaceClick: (e: MouseEvent) => void;
  errors: {
    uploadAPIError: string;
  };
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      onUploadClick: async (e: MouseEvent) => await this.onUploadClick(e),
      onUploadCancelClick: () => this.onUploadCancelClick(),
      onEmptySpaceClick: (e: MouseEvent) => this.onEmptySpaceClick(e),
      onAvatarClick: () => this.onAvatarClick(),
      modals: {
        uploadAvatar: false,
        newChat: false,
        chatSettings: false,
        chatAvatarUpload: false,
        addUser: false,
        deleteUsers: false,
      },
      errors: {
        uploadAPIError: '',
      },
    });
  }

  onEmptySpaceClick(e: MouseEvent) {
    if (!(e.target as HTMLElement).closest('.modal')) {
      this.setProps({
        modals: {
          newChat: false,
          chatSettings: false,
          chatAvatarUpload: false,
          addUser: false,
          deleteUsers: false,
        },
      });
    }
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
    this.setProps({
      ...this.props,
      modals: {
        uploadAvatar: false,
      },
    });
  }

  onAvatarClick() {
    this.setProps({
      ...this.props,
      modals: {
        uploadAvatar: true,
      },
    });
  }

  onUploadCancelClick() {
    this.setProps({
      ...this.props,
      modals: {
        uploadAvatar: false,
      },
    });
  }

  render() {
    return templateString as unknown as string;
  }
}

export const ProfilePage = withUser(ProfilePageBase as typeof Block);
