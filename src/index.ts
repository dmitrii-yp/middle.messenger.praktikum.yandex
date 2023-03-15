import { SignUpPage } from './pages/sign-up';
import { SignInPage } from './pages/sign-in';
import { ChatPage } from './pages/chat';
import { ProfilePage } from './pages/profile';
import { ChangeDataPage } from './pages/change-data';
import { ChangePasswordPage } from './pages/change-password';
import { registerComponents } from './core/register-components';
import { Route } from './helpers/const';
import AuthController from './controllers/auth-controller';
import Router from './core/router';
import Block from './core/block';

window.addEventListener('DOMContentLoaded', async () => {
  registerComponents();
  Router.use(Route.INDEX, SignInPage as typeof Block)
    .use(Route.SIGN_UP, SignUpPage as typeof Block)
    .use(Route.PROFILE, ProfilePage as typeof Block)
    .use(Route.CHATS, ChatPage as typeof Block)
    .use(Route.CHANGE_DATA, ChangeDataPage as typeof Block)
    .use(Route.CHANGE_PASSWORD, ChangePasswordPage as typeof Block);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Route.INDEX:
    case Route.SIGN_UP:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.getUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Route.CHATS);
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(Route.INDEX);
    }
  }
});
