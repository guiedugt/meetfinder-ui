import React from 'react';

import PasswordRecoveryForm from '../components/forms/PasswordRecoveryForm';
import { Page } from './styles/Page.styles';

const PasswordRecoveryPage: React.FC = (props) => {
  return (
    <Page>
      <PasswordRecoveryForm />
    </Page>
  );
};

export default PasswordRecoveryPage;
