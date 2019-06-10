import React from 'react';
import { connect } from 'react-redux';

import auth from '../../store/auth';

import Form from './Form';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

interface IProps {
  loading: boolean;
  login: (values: { [key: string]: string }) => void;
}

const LoginForm: React.FC<IProps> = ({
  loading,
  login,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    login(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <EmailInput />
      <PasswordInput />
    </Form>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
});

const mapDispatchToProps = {
  login: auth.actions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
