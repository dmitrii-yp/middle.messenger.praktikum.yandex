import Block from '../../core/block';
import templateString from 'bundle-text:./send-message-form.hbs';


export class SendMessageForm extends Block {
  constructor(props: any = {}) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => props.onSubmit(e),
      },
    });
  }

  static get componentName() {
    return 'SendMessageForm';
  }

  render() {
    return templateString as unknown as string;
  }
}
