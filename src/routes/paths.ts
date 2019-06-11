import Template from '../template/Template';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterConfirmationPage from '../pages/RegisterConfirmationPage';
import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import PollsPage from '../pages/PollsPage';

declare global {
  interface IPath {
    name: string;
    component: React.ComponentType;
    template?: React.ComponentType;
    default?: boolean;
  }
}

export const privatePaths: IPath[] = [
  {
    name: '/',
    component: PollsPage,
    template: Template,
  },
];

export const notLoggedPaths: IPath[] = [
  {
    name: '/login',
    component: LoginPage,
    default: true,
  },
  {
    name: '/register',
    component: RegisterPage,
  },
  {
    name: '/register/:token',
    component: RegisterConfirmationPage,
  },
  {
    name: '/password-recovery/:token',
    component: PasswordRecoveryPage,
  },
];

export const publicPaths: IPath[] = [
];
