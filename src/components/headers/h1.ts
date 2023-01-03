import Block from '../../core/block';
import templateString from 'bundle-text:./h1.hbs';

interface H1Props {
  header: string;
}

export class H1 extends Block {
  constructor(props: H1Props) {
    super(props);
  }

  static get componentName() {
    return 'H1';
  }

  render() {
    return templateString as unknown as string;
  }
}
