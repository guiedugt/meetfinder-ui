import React from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import { Form, Input } from 'antd';

interface IProps {
  fetchMyWorkshops: (params?: { [key: string]: any }) => any;
}

const MyWorkshopsFilter: React.FC<IProps> = ({
  fetchMyWorkshops,
}) => {
  const handleSearch: (filter: string) => void = (filter) => {
    fetchMyWorkshops({ filter });
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
  fetchMyWorkshops: workshops.actions.fetchMyWorkshops,
};

export default connect(null, mapDispatchToProps)(MyWorkshopsFilter);
