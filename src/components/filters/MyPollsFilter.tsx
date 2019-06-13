import React from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import { Form, Input } from 'antd';

interface IProps {
  fetchMyPolls: (params?: { [key: string]: any }) => any;
}

const PollFilter: React.FC<IProps> = ({
  fetchMyPolls,
}) => {
  const handleSearch: (filter: string) => void = (filter) => {
    fetchMyPolls({ filter });
  };

  return (
    <Form.Item
      label="Buscar Enquete"
    >
      <Input.Search
        allowClear={true}
        onSearch={handleSearch}
      />
    </Form.Item>
  );
};

const mapDispatchToProps = {
  fetchMyPolls: polls.actions.fetchMyPolls,
};

export default connect(null, mapDispatchToProps)(PollFilter);
