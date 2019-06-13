import React from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import { Icon, Popconfirm, Tooltip } from 'antd';

interface IProps {
  workshop: IWorkshop;
  deleteWorkshop: (workshopId: string) => void;
}

const DeleteWorkshopButton: React.FC<IProps> = ({
  workshop,
  deleteWorkshop,
  children,
}) => {
  const handleConfirm: (e?: React.MouseEvent<MouseEvent>) => void = (e) => {
    deleteWorkshop(workshop.id);
  };

  return (
    <Popconfirm
      title="Tem certeza?"
      okType="danger"
      okText="Sim"
      cancelText="Não"
      onConfirm={handleConfirm}
    >
      <Tooltip title="Deletar Workshop">
        <Icon type="delete" style={{ color: '#f52f33' }}>
          {children}
        </Icon>
      </Tooltip>
    </Popconfirm>
  );
};

const mapDispatchToProps = {
  deleteWorkshop: workshops.actions.deleteWorkshop,
};

export default connect(null, mapDispatchToProps)(DeleteWorkshopButton);
