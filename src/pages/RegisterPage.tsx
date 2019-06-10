import React from 'react';

import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import { Page, Container, Row, Title } from './styles/Page.styles';

const RegisterPage: React.FC = (props) => {
  return (
    <Page>
      <Container center={true}>
        <Title>Registrar</Title>
        <RegisterForm />
        <Row>
          <Link to="/login">Login</Link>
          <Link to="/password-recovery">Esqueci a senha</Link>
        </Row>
      </Container>
    </Page>
  );
};

export default RegisterPage;
