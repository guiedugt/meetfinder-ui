import React from 'react';
import { connect } from 'react-redux';

import users from '../../store/users';

import Form from './Form';
import EmailInput from '../inputs/EmailInput';

interface IProps {
  loading: boolean;
  resendEmail: (values: { [key: string]: string }) => void;
}

const ResendEmailForm: React.FC<IProps> = ({
  loading,
  resendEmail,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    resendEmail(values);
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
  resendEmail: users.actions.resendEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResendEmailForm);
