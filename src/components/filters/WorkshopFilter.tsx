import React from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import { Form, Input } from 'antd';

interface IProps {
  fetchWorkshops: (params?: { [key: string]: any }) => any;
}

const WorkshopFilter: React.FC<IProps> = ({
  fetchWorkshops,
}) => {
  const handleSearch: (filter: string) => void = (filter) => {
    fetchWorkshops({ filter });
  };

  return (
    <Form.Item
      label="Buscar Workshop"
    >
      <Input.Search
        allowClear={true}
        onSearch={handleSearch}
      />
    </Form.Item>
  );
};

const mapDispatchToProps = {
  fetchWorkshops: workshops.actions.fetchWorkshops,
};

export default connect(null, mapDispatchToProps)(WorkshopFilter);
