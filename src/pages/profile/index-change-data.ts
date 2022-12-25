import { ChangeDataPage } from './change-data';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ChangeDataPage({});

  renderDOM('#app', page);
});
