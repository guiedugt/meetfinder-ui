import React from 'react';

import LoginForm from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';
import { Container } from './styles/LoginPage.styles';
import { Page, Row, Title } from './styles/Page.styles';

const LoginPage: React.FC = (props) => {
  return (
    <Page>
      <Container>
        <Title>Login</Title>
        <LoginForm />
        <Row>
          <Link to="/register">Registrar</Link>
          <Link to="/password-recovery">Esqueci a senha</Link>
        </Row>
      </Container>
    </Page>
  );
};

export default LoginPage;
