import React from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import { Button, Popconfirm } from 'antd';

interface IProps {
  poll: IPoll;
  deletePoll: (pollId: string) => void;
}

const DeletePollButton: React.FC<IProps> = ({
  poll,
  deletePoll,
  children,
}) => {
  const handleConfirm: (e?:React.MouseEvent<MouseEvent>) => void = (e) => {
    deletePoll(poll.id);
  };

  return (
    <Popconfirm
      title="Tem certea?"
      okType="danger"
      okText="Sim"
      cancelText="Não"
      onConfirm={handleConfirm}
    >
      <Button
        type="danger"
        icon="delete"
      >
        {children || 'Deletar Enquete'}
      </Button>
    </Popconfirm>
  );
};

const mapDispatchToProps = {
  deletePoll: polls.actions.deletePoll,
};

export default connect(null, mapDispatchToProps)(DeletePollButton);
