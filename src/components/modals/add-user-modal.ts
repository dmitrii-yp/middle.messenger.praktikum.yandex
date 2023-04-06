import Block from '../../core/block';
import templateString from './add-user-modal.hbs';
import ChatController from '../../controllers/chat-controller';
import { withChats } from '../../hocs/with-chats';
import { InputType, validateForm } from '../../helpers/validate-form';

interface AddUserModalProps {
  onModalCancelClick: () => void;
  onAddUserSubmit: () => void;
  error: string;
}

class AddUserModalBase extends Block {
  constructor(props: AddUserModalProps) {
    super({
      ...props,
      error: '',
      onAddUserSubmitUpdated: (e: MouseEvent) => this.onAddUserSubmitUpdated(e),
    });
  }

  static get componentName() {
    return 'AddUserModal';
  }

  async onAddUserSubmitUpdated(e: MouseEvent) {
    e.preventDefault();

    const userID = (
      document.querySelector('input[name="chat_user"]') as HTMLFormElement
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

    const APIError = await ChatController.addUser(
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
    this.props.onAddUserSubmit();
  }

  render() {
    return templateString as unknown as string;
  }
}

export const AddUserModal = withChats(AddUserModalBase as typeof Block);
