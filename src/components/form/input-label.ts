import Block from '../../core/block';
import templateString from './input-label.hbs';

interface InputLabelProps {
  label: string;
  for: string;
}

export class InputLabel extends Block {
  constructor(props: InputLabelProps) {
    super(props);
  }

  static get componentName() {
    return 'InputLabel';
  }

  render() {
    return templateString as unknown as string;
  }
}
