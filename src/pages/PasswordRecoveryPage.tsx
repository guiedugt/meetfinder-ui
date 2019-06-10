import React from 'react';
import { RouteComponentProps } from 'react-router';

import PasswordRecoveryForm from '../components/forms/PasswordRecoveryForm';
import { Link } from 'react-router-dom';
import { Page, Container, Row, Title } from './styles/Page.styles';

interface IParams {
  token: string;
}

const PasswordRecoveryPage: React.FC<RouteComponentProps<IParams>> = ({
  match,
}) => {
  const { token } = match.params;

  return (
    <Page>
      <Container center={true}>
        <Title>Recuperar Senha</Title>
        <PasswordRecoveryForm token={token} />
        <Row>
          <Link to="/login">Login</Link>
        </Row>
      </Container>
    </Page>
  );
};

export default PasswordRecoveryPage as any as React.ComponentType;
