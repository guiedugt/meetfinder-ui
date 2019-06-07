import React from 'react';
import { connect } from 'react-redux';

import reverse from 'lodash/reverse';
import { privatePaths, notLoggedPaths, publicPaths } from './paths';

import LoginPage from '../pages/LoginPage';
import TemplateRoute from './TemplateRoute';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps{
  logged: boolean;
}

interface ISetRoute {
  (path: IPath): React.ReactNode;
}

const Routes: React.FC<IProps> = ({
  logged,
}) => {
  const defaultPath: IPath | undefined = logged
    ? privatePaths.find(path => !!path.default)
    : [...notLoggedPaths, ...publicPaths].find(path => !!path.default);

  const setRoute: ISetRoute = path =>
    path.template
      ? <TemplateRoute
        key={path.name}
        path={path.name}
        exact={true}
        component={path.component}
        template={path.template}
      />
      : <Route
        key={path.name}
        path={path.name}
        exact={true}
        component={path.component}
        template={path.template}
      />;

  const setPrivateRoute: ISetRoute = path =>
    setRoute({
      ...path,
      template: logged ? path.template : undefined,
      component: logged ? path.component : LoginPage,
    });

  const setRedirect: ISetRoute = path => (
    <Redirect
      key={path.name}
      exact={true}
      from={path.name}
      to={defaultPath ? defaultPath.name : '/'}
    />
  );

  const routesPrecedence = [
    privatePaths.map(setPrivateRoute),
    notLoggedPaths.map(logged ? setRedirect : setRoute),
    publicPaths.map(setRoute),
  ];

  const routes = logged
    ? routesPrecedence
    : reverse(routesPrecedence);

  const notFoundRedirect = () => <Redirect to={defaultPath ? defaultPath.name : '/'} />;

  return (
    <Switch>
      {routes}
      <Route component={notFoundRedirect} />
    </Switch>
  );
};

const mapStateToProps = ({ auth }) => ({
  logged: auth.logged,
});

export default withRouter(connect(mapStateToProps)(Routes));
