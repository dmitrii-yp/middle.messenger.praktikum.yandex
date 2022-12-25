import { ProfilePage } from './profile';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ProfilePage({});

  renderDOM('#app', page);
});
