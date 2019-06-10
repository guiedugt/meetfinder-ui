import React from 'react';
import { connect } from 'react-redux';

import users from '../../store/users';

import Form from './Form';
import PasswordInput from '../inputs/PasswordInput';
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput';

interface IProps {
  loading: boolean;
  changePassword: (values: {
    password: string;
    'password-confirmation': string;
  }) => void;
}

const ChangePasswordForm: React.FC<IProps> = ({
  loading,
  changePassword,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    changePassword(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <PasswordInput placeholder="Nova senha" />
      <PasswordConfirmationInput placeholder="Confirmar nova senha" />
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
});

const mapDispatchToProps = {
  changePassword: users.actions.changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
