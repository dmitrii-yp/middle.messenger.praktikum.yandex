import { ErrorPage } from './error';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ErrorPage({
    code: 404,
    description: 'This is the dead end.',
  });

  renderDOM('#app', page);
});
