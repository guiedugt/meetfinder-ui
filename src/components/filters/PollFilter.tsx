import React from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import { Form, Input } from 'antd';

interface IProps {
  fetchPolls: (params?: { [key: string]: any }) => any;
}

const PollFilter: React.FC<IProps> = ({
  fetchPolls,
}) => {
  const handleSearch: (filter: string) => void = (filter) => {
    fetchPolls({ filter });
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
  fetchPolls: polls.actions.fetchPolls,
};

export default connect(null, mapDispatchToProps)(PollFilter);
