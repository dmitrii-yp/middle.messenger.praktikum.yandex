import Block from '../../core/block';
import templateString from 'bundle-text:./submit-button.hbs';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export class SubmitButton extends Block {
  constructor({ label, onClick }: ButtonProps) {
    super({
      label,
      events: {
        click: onClick,
      },
    });
  }

  static get componentName() {
    return 'SubmitButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
