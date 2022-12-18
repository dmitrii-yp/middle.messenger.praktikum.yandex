import Block from '../../utils/block';

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
    return `<button
              class="h-[40] w-full rounded-lg bg-gradient-to-br from-teal1 to-green0 font-monospace text-sm text-white shadow-lg hover:brightness-110 focus:brightness-90"
              type="submit"
            >{{label}}</button>`;
  }
}
