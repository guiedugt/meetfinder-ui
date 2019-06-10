import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import users from '../store/users';

import { Spin } from 'antd';
import { Page, Container, Row } from './styles/Page.styles';

interface IParams {
  token: string;
}

interface IProps extends RouteComponentProps<IParams> {
  confirmEmail: (token: string) => void;
}

const RegisterPage: React.FC<IProps> = ({
  match,
  confirmEmail,
}) => {
  useEffect(
    () => {
      const { token } = match.params;
      confirmEmail(token);
    },
    [],
  );

  return (
    <Page>
      <Container center={true}>
        <Row>
          <Spin
            size="large"
            tip="Confirmando Registro"
            style={{ margin: '0 auto' }}
          />
        </Row>
      </Container>
    </Page>
  );
};

const mapDispatchToProps = {
  confirmEmail: users.actions.confirmEmail,
};

export default connect(null, mapDispatchToProps)(RegisterPage) as any as React.ComponentType;
