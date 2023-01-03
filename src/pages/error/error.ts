import Block from '../../core/block';
import templateString from 'bundle-text:./error.hbs';

type ErrorProps = {
  code: number;
  description: string;
}

export class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return templateString as unknown as string;
  }
}
