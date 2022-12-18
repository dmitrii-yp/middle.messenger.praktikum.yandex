import Block from '../../utils/block';

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
    return `
      <h1
        class="mb-8 bg-gradient-to-br from-teal1 to-green0 bg-clip-text font-monospace text-4xl font-light leading-relaxed text-transparent"
        ><span class="text-purple2">./</span>{{header}}
      </h1>
    `;
  }
}
