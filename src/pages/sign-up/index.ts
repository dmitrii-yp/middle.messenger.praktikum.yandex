import { SignUpPage } from './sign-up';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new SignUpPage({});

  renderDOM('#app', page);
});
