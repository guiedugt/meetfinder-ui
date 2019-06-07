
import Template from '../template/Template';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

declare global {
  interface IPath {
    name: string;
    component: React.ComponentType;
    template?: React.ComponentType;
    default?: boolean;
  }
}

export const privatePaths: IPath[] = [
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
];

export const publicPaths: IPath[] = [
];
