import { SignUpPage } from './pages/sign-up';
import { SignInPage } from './pages/sign-in';
import { ProfilePage } from './pages/profile';
import { registerComponents } from './core/register-components';
import AuthController from './controllers/auth-controller';
import Router from './core/router';
import Block from './core/block';

enum Routes {
  Index = '/',
  SignUp = '/sign-up',
  Profile = '/profile',
}

window.addEventListener('DOMContentLoaded', async () => {
  registerComponents();
  Router.use(Routes.Index, SignInPage as typeof Block)
    .use(Routes.SignUp, SignUpPage as typeof Block)
    .use(Routes.Profile, ProfilePage as typeof Block);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }
  try {
    await AuthController.getUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
