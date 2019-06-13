import Template from '../template/Template';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterConfirmationPage from '../pages/RegisterConfirmationPage';
import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import PollsPage from '../pages/PollsPage';
import MyPollsPage from '../pages/MyPollsPage';
import WorkshopsPage from '../pages/WorkshopsPage';
import MyWorkshopsPage from '../pages/MyWorkshopsPage';

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
    name: '/polls',
    component: PollsPage,
    template: Template,
    default: true,
  },
  {
    name: '/mypolls',
    component: MyPollsPage,
    template: Template,
  },
  {
    name: '/workshops',
    component: WorkshopsPage,
    template: Template,
  },
  {
    name: '/myworkshops',
    component: MyWorkshopsPage,
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
