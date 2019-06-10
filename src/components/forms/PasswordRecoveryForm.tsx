import React from 'react';
import { connect } from 'react-redux';

import users from '../../store/users';

import Form from './Form';
import PasswordInput from '../inputs/PasswordInput';
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput';

interface IProps {
  token: string;
  loading: boolean;
  recoverPassword: (values: {
    token: string;
    password: string;
    'password-confirmation': string;
  }) => void;
}

const PasswordRecoveryForm: React.FC<IProps> = ({
  token,
  loading,
  recoverPassword,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    recoverPassword({ token, ...values });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <PasswordInput />
      <PasswordConfirmationInput />
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
});

const mapDispatchToProps = {
  recoverPassword: users.actions.recoverPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryForm);
