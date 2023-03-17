import Block from '../../core/block';
import templateString from 'bundle-text:./avatar.hbs';

interface AvatarProps {
  avatar: string;
  onClick: () => void;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  static get componentName() {
    return 'Avatar';
  }

  render() {
    return templateString as unknown as string;
  }
}
