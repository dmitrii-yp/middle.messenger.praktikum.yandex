import { ErrorPage } from './error';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../helpers/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ErrorPage({
    code: 500,
    description: 'Already on it.',
  });

  renderDOM('#app', page);
});
