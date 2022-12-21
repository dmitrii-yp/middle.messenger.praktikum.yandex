import { TestPage } from './pages/test/test-page';
import { renderDOM } from './core/render-dom';
import { registerComponents } from './core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new TestPage({});

  renderDOM('#app', page);
});
