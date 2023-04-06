import Block from '../../core/block';
import templateString from './data-row.hbs';

type DataRowProps = {
  label: string;
  value: string;
};

export class DataRow extends Block {
  constructor(props: DataRowProps) {
    super(props);
  }

  static get componentName() {
    return 'DataRow';
  }

  render() {
    return templateString as unknown as string;
  }
}
