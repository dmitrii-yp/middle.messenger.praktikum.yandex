import TestPage from './pages/test';
import { renderDOM } from './utils/render-dom';
import { registerAllComponents } from './utils/regester-all-components';


document.addEventListener('DOMContentLoaded', () => {
  registerAllComponents();
  const page = new TestPage({});

  renderDOM('#app', page);
});
