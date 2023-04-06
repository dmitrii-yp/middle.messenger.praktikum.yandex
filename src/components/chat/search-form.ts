import Block from '../../core/block';
import templateString from './search-form.hbs';
import ChatController from '../../controllers/chat-controller';

interface SearchFormProps {
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class SearchForm extends Block<SearchFormProps> {
  constructor(props: SearchFormProps) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => this.onSearchSubmit(e),
      },
    });
  }

  onSearchSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    ChatController.searchChats(searchQuery);
  }

  static get componentName() {
    return 'SearchForm';
  }

  render() {
    return templateString as unknown as string;
  }
}
