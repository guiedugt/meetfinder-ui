import React from 'react';
import { connect } from 'react-redux';

import users from '../../store/users';

import Form from './Form';
import EmailInput from '../inputs/EmailInput';

interface IProps {
  loading: boolean;
  sendPasswordRecoveryEmail: (values: {
    email: string;
  }) => void;
}

const PasswordRecoveryEmailForm: React.FC<IProps> = ({
  loading,
  sendPasswordRecoveryEmail,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    sendPasswordRecoveryEmail(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <EmailInput />
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
});

const mapDispatchToProps = {
  sendPasswordRecoveryEmail: users.actions.sendPasswordRecoveryEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryEmailForm);
