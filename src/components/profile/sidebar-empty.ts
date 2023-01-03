import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar-empty.hbs';


export class SideBarEmpty extends Block {
  constructor(props: any) {
    super(props);
  }

  static get componentName() {
    return 'SideBarEmpty';
  }

  render() {
    return templateString as unknown as string;
  }
}
