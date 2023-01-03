import { ChatPage } from './chat';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new ChatPage({});

  renderDOM('#app', page);
});
