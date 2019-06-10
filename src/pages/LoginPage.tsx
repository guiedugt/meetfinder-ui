import React from 'react';

import LoginForm from '../components/forms/LoginForm';
import PasswordRecoveryModal from '../components/modals/PasswordRecoveryModal';
import ResendEmailModal from '../components/modals/ResendEmailModal';
import { Link } from 'react-router-dom';
import { Page, Container, Row, Title } from './styles/Page.styles';

const LoginPage: React.FC = (props) => {
  return (
    <Page>
      <Container center={true}>
        <Title>Login</Title>
        <LoginForm />
        <Row>
          <ResendEmailModal />
          <PasswordRecoveryModal />
        </Row>
        <Row>
          <Link to="/register">Registrar</Link>
        </Row>
      </Container>
    </Page>
  );
};

export default LoginPage;
