import PublicPage from '../pages/PublicPage';

import Template from '../template/Template';

declare global {
  interface IPath {
    name: string;
    component: new (props: any) => React.Component;
    template?: new (props: any) => React.Component;
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
