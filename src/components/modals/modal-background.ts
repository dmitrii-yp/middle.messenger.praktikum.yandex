import Block from '../../core/block';
import templateString from './modal-background.hbs';

interface ModalBackgroundProps {
  onEmptySpaceClick: (e: MouseEvent) => void;
}

export class ModalBackground extends Block {
  constructor(props: ModalBackgroundProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => props.onEmptySpaceClick(e),
      },
    });
  }

  static get componentName() {
    return 'ModalBackground';
  }

  render() {
    return templateString as unknown as string;
  }
}
