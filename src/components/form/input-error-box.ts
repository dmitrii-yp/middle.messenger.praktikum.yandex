import Block from '../../core/block';
import templateString from 'bundle-text:./input-error-box.hbs';

interface InputErrorBoxProps {
  error: string;
}

export class InputErrorBox extends Block {
  constructor(props: InputErrorBoxProps) {
    super(props);
  }

  static get componentName() {
    return 'InputErrorBox';
  }

  render() {
    return templateString as unknown as string;
  }
}
