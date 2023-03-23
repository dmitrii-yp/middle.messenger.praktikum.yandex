import Block from '../../core/block';
import templateString from 'bundle-text:./send-message-form.hbs';

interface SendMessageFormProps {
  onSubmit: (e: SubmitEvent) => void;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class SendMessageForm extends Block<SendMessageFormProps> {
  constructor(props: SendMessageFormProps) {
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
