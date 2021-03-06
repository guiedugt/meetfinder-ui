import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router } from 'react-router-dom';

import history from './routes/history';

import Routes from './routes/Routes';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default hot(App);
