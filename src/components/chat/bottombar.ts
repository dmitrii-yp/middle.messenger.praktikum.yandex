import Block from '../../core/block';
import templateString from 'bundle-text:./bottombar.hbs';
import MessageController from '../../controllers/message-controller';
import { validateForm, InputType } from '../../helpers/validate-form';

export class ChatBottomBar extends Block {
  constructor(props: any) {
    super(props);
    this.setProps({
      message: '',
      onClick: () => this.onClick(),
      error: '',
    });
  }

  static get componentName() {
    return 'ChatBottomBar';
  }

  onClick() {
    const messageInput = this._element?.querySelector('input') as HTMLInputElement;
    const inputData = [{
      type: messageInput.name as InputType,
      value: messageInput.value,
    }];

    const errors = validateForm(inputData);

    if (Object.keys(errors).length === 0) {
      this.setProps({
        error: '',
      });

      MessageController.sendMessage(this.props.chats.activeChatId, messageInput.value);

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
