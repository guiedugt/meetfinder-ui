import React from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import Form from './Form';
import NameInput from '../inputs/NameInput';

interface IProps {
  initialValues?: IPoll;
  loading: boolean;
  createPoll: (values: {
    email: string;
    password: string;
  }) => void;
}

const PollForm: React.FC<IProps> = ({
  initialValues,
  loading,
  createPoll,
}) => {
  console.log('initialValues:', initialValues);

  const handleSubmit: IOnSubmit = (values) => {
    createPoll(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <NameInput />
    </Form>
  );
};

const mapStateToProps = ({ polls }) => ({
  loading: polls.loading,
});

const mapDispatchToProps = {
  createPoll: polls.actions.createPoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollForm);
