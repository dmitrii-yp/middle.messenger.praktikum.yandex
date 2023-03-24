import Block from '../../core/block';
import templateString from 'bundle-text:./bottombar.hbs';
import MessageController from '../../controllers/message-controller';
import { validateForm, InputType } from '../../helpers/validate-form';
import { ChatsState } from '../../typings/store-types';

interface ChatBottomBarProps {
  chats: ChatsState;
  message: string;
  onSubmit: (e: SubmitEvent) => void;
  error: string;
}

export class ChatBottomBar extends Block<ChatBottomBarProps> {
  constructor(props: ChatBottomBarProps) {
    super({
      ...props,
      message: '',
      onSubmit: (e: SubmitEvent) => this.onSubmit(e),
      error: '',
    });
  }

  static get componentName() {
    return 'ChatBottomBar';
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const messageInput = this._element?.querySelector(
      'input'
    ) as HTMLInputElement;
    const inputData = [
      {
        type: messageInput.name as InputType,
        value: messageInput.value,
      },
    ];

    const errors = validateForm(inputData);

    if (Object.keys(errors).length === 0) {
      this.setProps({
        error: '',
      });

      MessageController.sendMessage(
        this.props.chats.activeChatId,
        messageInput.value
      );

      return;
    }

    this.setProps({
      error: errors[messageInput.name as InputType],
    });
  }

  render() {
    return templateString as unknown as string;
  }
}
