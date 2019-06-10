import React from 'react';
import { connect } from 'react-redux';

import users from '../../store/users';

import Form from './Form';
import NameInput from '../inputs/NameInput';
import EmailInput from '../inputs/EmailInput';
import EmailConfirmationInput from '../inputs/EmailConfirmationInput';
import PasswordInput from '../inputs/PasswordInput';
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput';

interface IProps {
  loading: boolean;
  register: (values: { [key: string]: string }) => void;
}

const RegisterForm: React.FC<IProps> = ({
  loading,
  register,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    register(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <NameInput />
      <EmailInput />
      <EmailConfirmationInput />
      <PasswordInput />
      <PasswordConfirmationInput />
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
});

const mapDispatchToProps = {
  register: users.actions.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
