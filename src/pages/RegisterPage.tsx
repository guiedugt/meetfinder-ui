import React from 'react';

import RegisterForm from '../components/forms/RegisterForm';
import { Page } from './styles/Page.styles';

const RegisterPage: React.FC = (props) => {
  return (
    <Page>
      <RegisterForm />
    </Page>
  );
};

export default RegisterPage;
