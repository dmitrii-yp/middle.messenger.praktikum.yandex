import Block from '../../core/block';
import templateString from 'bundle-text:./text-button.hbs';

interface TextButtonProps {
  label: string;
  href?: string;
  red: boolean;
}

export class TextButton extends Block {
  constructor(props: TextButtonProps) {
    const onClick = (e: MouseEvent) => {
      console.log('click');
      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  static get componentName() {
    return 'TextButton';
  }

  render() {
    return templateString as unknown as string;
  }
}
