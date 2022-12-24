import { PagesList } from './pages-list';
import { renderDOM } from '../../core/render-dom';
import { registerComponents } from '../../core/register-components';

const PageData = {
  pages: [
    {
      name: 'Sign In',
      href: './pages/sign-in/index.html',
    },
    {
      name: 'Sign Up',
      href: './pages/sign-up/sign-up.hbs',
    },
    {
      name: 'Chat',
      href: './pages/chat/chat.hbs',
    },
    {
      name: 'Chat /unselected/',
      href: './pages/chat/chat-unselected.hbs',
    },
    {
      name: 'Profile',
      href: './pages/profile/profile.hbs',
    },
    {
      name: 'Profile - Change data',
      href: './pages/profile/change-data.hbs',
    },
    {
      name: 'Profile - Change password',
      href: './pages/profile/change-password.hbs',
    },
    {
      name: '404',
      href: './pages/error/404.hbs',
    },
    {
      name: '500',
      href: './pages/error/500.hbs',
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new PagesList(PageData);

  renderDOM('#app', page);
});
