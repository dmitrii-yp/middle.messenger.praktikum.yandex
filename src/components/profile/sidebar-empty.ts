import Block from '../../core/block';
import templateString from './sidebar-empty.hbs';

export class SideBarEmpty extends Block {
  constructor() {
    super();
  }

  static get componentName() {
    return 'SideBarEmpty';
  }

  render() {
    return templateString as unknown as string;
  }
}
