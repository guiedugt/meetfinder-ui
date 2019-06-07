import React from 'react';
import { connect } from 'react-redux';

import reverse from 'lodash/reverse';
import { publicPaths } from './paths';

// import LoginPage from '../pages/LoginPage'
import TemplateRoute from './TemplateRoute';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps {
  logged: boolean;
}

const Routes: React.FC<IProps & RouteComponentProps> = ({
  logged,
}) => {
  // const defaultPrivatePath: IPath = privateRoutes.find(route => route.default);

  const setRoute: (path: IPath) => React.ReactNode = path =>
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

  // const setPrivateRoute = path =>
  //   setRoute({
  //     ...path,
  //     template: logged ? path.template : undefined,
  //     component: logged ? path.component : LoginPage
  //   });

  // const setRedirect = path => (
  //   <Redirect
  //     key={path.name}
  //     exact={true}
  //     from={path.name}
  //     to="/"
  //   />
  // );

  const routesPrecedence = [
    // privateRoutes.map(setPrivateRoute),
    // notLoggedRoutes.map(logged ? setRedirect : setRoute),
    publicPaths.map(setRoute),
  ];

  const routes = logged
    ? routesPrecedence
    : reverse(routesPrecedence);

  const notFoundRedirect = () => <Redirect to="/" />;

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
