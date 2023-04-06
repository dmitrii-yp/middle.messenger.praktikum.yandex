import Block from '../../core/block';
import templateString from './delete-user-modal.hbs';
import ChatController from '../../controllers/chat-controller';
import { withChats } from '../../hocs/with-chats';
import { InputType, validateForm } from '../../helpers/validate-form';

interface DeleteUserModalProps {
  onModalCancelClick: () => void;
  onDeleteUserSubmit: () => void;
  error: string;
}

class DeleteUserModalBase extends Block {
  constructor(props: DeleteUserModalProps) {
    super({
      ...props,
      error: '',
      onDeleteUserSubmitUpdated: (e: MouseEvent) =>
        this.onDeleteUserSubmitUpdated(e),
    });
  }

  static get componentName() {
    return 'DeleteUserModal';
  }

  async onDeleteUserSubmitUpdated(e: MouseEvent) {
    e.preventDefault();

    const userID = (
      document.querySelector('input[name="delete_user"]') as HTMLFormElement
    ).value;

    const errors = validateForm([
      { type: 'chat_user' as InputType, value: userID },
    ]);

    if (Object.values(errors).length !== 0) {
      this.setProps({
        error: errors.chat_user,
      });

      return;
    }

    const userIDNumbered = Number(userID);

    const APIError = await ChatController.deleteUser(
      this.props.chats.activeChatId,
      userIDNumbered
    );

    if (APIError) {
      this.setProps({
        error: APIError,
      });
      return;
    }
    ChatController.setActiveChatId(this.props.chats.activeChatId);
    this.props.onDeleteUserSubmit();
  }

  render() {
    return templateString as unknown as string;
  }
}

export const DeleteUserModal = withChats(DeleteUserModalBase as typeof Block);
