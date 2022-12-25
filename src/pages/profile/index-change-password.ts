import { ChangePasswordPage } from './change-password';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ChangePasswordPage({});

  renderDOM('#app', page);
});
