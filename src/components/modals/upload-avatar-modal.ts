import Block from '../../core/block';
import templateString from 'bundle-text:./upload-avatar-modal.hbs';

interface UploadAvatarModalProps {
  onUploadClick: () => void;
  onUploadCancelClick: () => void;
}

export class UploadAvatarModal extends Block<UploadAvatarModalProps> {
  constructor(props: UploadAvatarModalProps) {
    super(props);
  }

  static get componentName() {
    return 'UploadAvatarModal';
  }

  render() {
    return templateString as unknown as string;
  }
}
