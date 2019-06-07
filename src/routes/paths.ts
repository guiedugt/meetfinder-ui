import PublicPage from '../pages/PublicPage';

import Template from '../template/Template';

declare global {
  interface IPath {
    name: string;
    component: React.ComponentType;
    template?: React.ComponentType;
    default?: boolean;
  }
}

export const privatePaths = [
];

export const notLoggedPaths = [
];

export const publicPaths = [
  {
    name: '/',
    component: PublicPage,
    template: Template,
    default: true,
  },
];
