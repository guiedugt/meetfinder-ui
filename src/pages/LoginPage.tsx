import React from 'react';

import LoginForm from '../components/forms/LoginForm';
import { Page } from './styles/Page.styles';

const LoginPage: React.FC = (props) => {
  return (
    <Page>
      <LoginForm />
    </Page>
  );
};

export default LoginPage;
