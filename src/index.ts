import { PagesList } from './pages/pages-list/pages-list';
import { renderDOM } from './core/render-dom';
import { registerComponents } from './core/register-components';

const PageData = {
  pages: [
    {
      name: 'Sign In',
      href: './pages/sign-in/index.html',
    },
    {
      name: 'Sign Up',
      href: './pages/sign-up/index.html',
    },
    {
      name: 'Chat',
      href: './pages/chat/index.html',
    },
    {
      name: 'Profile',
      href: './pages/profile/index.html',
    },
    {
      name: 'Profile - Change data',
      href: './pages/profile/index.html',
    },
    {
      name: 'Profile - Change password',
      href: './pages/profile/index.html',
    },
    {
      name: '404',
      href: './pages/error/404.html',
    },
    {
      name: '500',
      href: './pages/error/500.html',
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  const page = new PagesList(PageData);

  renderDOM('#app', page);
});
