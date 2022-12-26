import { PagesList } from './pages/pages-list/pages-list';
import { renderDOM } from './core/render-dom';
import { registerComponents } from './core/register-components';
import { PagesData } from './mocks/pages';


document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new PagesList(PagesData);

  renderDOM('#app', page);
});
