import React from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import Form from './Form';
import TextInput from '../inputs/TextInput';
import SubjectsInput from '../inputs/SubjectsInput';
import DeadlineInput from '../inputs/DeadlineInput';

interface IProps {
  loading: boolean;
  initialValues?: IPoll;
  createPoll: (values: {
    email: string;
    password: string;
  }) => void;
}

const PollForm: React.FC<IProps> = ({
  loading,
  createPoll,
  initialValues,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    values.deadline = values.deadline.toISOString();
    createPoll(values);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <TextInput
        name="name"
        label="Nome"
        required={true}
        placeholder="Descrição da enquete"
      />
      <SubjectsInput />
      <DeadlineInput label="Encerramento" />
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
