import Block from '../../core/block';
import templateString from 'bundle-text:./h2.hbs';

interface H2Props {
  header: string;
}

export class H2 extends Block {
  constructor(props: H2Props) {
    super(props);
  }

  static get componentName() {
    return 'H2';
  }

  render() {
    return templateString as unknown as string;
  }
}
