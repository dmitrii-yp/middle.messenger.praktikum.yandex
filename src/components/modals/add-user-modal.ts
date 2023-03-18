import Block from '../../core/block';
import templateString from 'bundle-text:./add-user-modal.hbs';

interface AddUserModalProps {
  onModalCancelClick: () => void;
  onAddUserSubmit: () => void;
}

export class AddUserModal extends Block<AddUserModalProps> {
  constructor(props: AddUserModalProps) {
    super(props);
  }

  static get componentName() {
    return 'AddUserModal';
  }

  render() {
    return templateString as unknown as string;
  }
}
