import Block from '../../core/block';
import templateString from 'bundle-text:./pages-list.hbs';

type PagesListProps = {
  pages: {
    name: string;
    path: string;
  }
};

export class PagesList extends Block<PagesListProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return templateString as unknown as string;
  }
}
