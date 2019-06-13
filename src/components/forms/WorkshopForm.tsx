import React from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import Form from './Form';
import DeadlineInput from '../inputs/DeadlineInput';

interface IProps {
  loading: boolean;
  initialValues?: IWorkshop;
  createWorkshop: (values: { date: string }) => void;
  editWorkshop: (values: { date: string }) => void;
}

const WorkshopForm: React.FC<IProps> = ({
  loading,
  createWorkshop,
  editWorkshop,
  initialValues,
}) => {
  const handleSubmit: IOnSubmit = (values) => {
    values.date = values.deadline.toISOString();
    if (initialValues) {
      values.id = initialValues.id;
      editWorkshop(values);
    } else {
      createWorkshop(values);
    }
  };

  return (
    <Form
      initialValues={initialValues}
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
  editWorkshop: workshops.actions.editWorkshop,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopForm);
