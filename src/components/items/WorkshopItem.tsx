import React from 'react';

import { Descriptions } from 'antd';

interface IProps {
  workshop: IWorkshop;
}

const WorkshopItem: React.FC<IProps> = ({
  workshop,
}) => {
  return (
    <Descriptions
      title={workshop.name}
      bordered={true}
      column={{ xs: 1, sm: 2 }}
      size="small"
    >
      <Descriptions.Item label="Assunto">
        <span>
          {workshop.subject}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Sala">
        <a
          href={workshop.room}
          target="_blank"
          rel="noopener noreferrer"
        >
          {workshop.room}
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="Nome do organizador">
        <span>
          {workshop.owner.name}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Email do Organizador">
        <span>
          {workshop.owner.email}
        </span>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default WorkshopItem;
