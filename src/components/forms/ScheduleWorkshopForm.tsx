import React from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import Form from './Form';
import DeadlineInput from '../inputs/DeadlineInput';

interface IProps {
  poll: IPoll;
  loading: boolean;
  createWorkshop: (values: {
    pollId: string;
    date: string;
  }) => void;
}

const PollForm: React.FC<IProps> = ({
  poll,
  loading,
  createWorkshop,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    values.date = values.deadline.toISOString();
    values.pollId = poll.id;
    createWorkshop(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
    >
      <DeadlineInput label="Data do Workshop" />
    </Form>
  );
};

const mapStateToProps = ({ workshops }) => ({
  loading: workshops.loading,
});

const mapDispatchToProps = {
  createWorkshop: workshops.actions.createWorkshop,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollForm);
