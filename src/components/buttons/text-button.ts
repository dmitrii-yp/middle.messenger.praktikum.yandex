
import Block from '../../utils/block';

interface TextButtonProps {
  label: string;
  href?: string;
  red: boolean;
}

export class TextButton extends Block {
  constructor(props: TextButtonProps) {
    super(props);
  }

  static get componentName() {
    return 'TextButton';
  }

  render() {
    return `
      <a
        {{#if href}}
        href={{href}}
        {{else}}
        href='/'
        {{/if}}

        class='mx-auto mt-2 w-full text-center font-monospace text-sm

        {{#if red}}
        text-red0 hover:text-red2
        {{else}}
        text-green0 hover:text-green1
        {{/if}}

        hover:underline hover:underline-offset-4'
      >{{label}}
      </a>
    `;
  }
}
