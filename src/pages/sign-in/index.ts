import { SignInPage } from './sign-in';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new SignInPage({});

  renderDOM('#app', page);
});
