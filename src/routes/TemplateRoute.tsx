import React from 'react';

import { Route } from 'react-router-dom';

interface IProps {
  component: new (props: any) => React.Component;
  template: new (props: any) => React.Component;
  path?: string;
  exact?: boolean;
  key?: any;
}

const TemplateRoute: React.FC<IProps> = ({
  component: Component,
  template: Template,
  ...rest
}) => {
  const renderRoute = (props: { [key: string]: any }) => (
    <Template {...props}>
      <Component {...props} />
    </Template>
  );

  return (
    <Route
      {...rest}
      render={renderRoute}
    />
  );
};

export default TemplateRoute;
