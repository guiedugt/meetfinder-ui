import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import WorkshopItem from '../items/WorkshopItem';
import { Collapse, Tooltip } from 'antd';
import { Header } from './styles/List.styles';

interface IProps {
  workshops: IWorkshop[];
  fetchWorkshops: (params?: { [key: string]: any }) => any;
}

const WorkshopList: React.FC<IProps> = ({
  workshops,
  fetchWorkshops,
}) => {
  useEffect(() => { fetchWorkshops(); }, [fetchWorkshops]);

  const header: (workshop: IWorkshop) => JSX.Element = workshop => (
    <Header>
      <span className="name">
        <Tooltip title={workshop.name}>
          {workshop.name}
        </Tooltip>
      </span>
      <span className="date">
        Agendado para {new Date(workshop.date).toLocaleString()}
      </span>
    </Header>
  );

  const panels: JSX.Element[] = workshops.map(workshop =>
    <Collapse.Panel
      header={header(workshop)}
      key={workshop.id}
    >
      <WorkshopItem workshop={workshop} />
    </Collapse.Panel>,
  );

  return (
    <Collapse
      accordion={true}
      bordered={false}
    >
      {panels}
    </Collapse>
  );
};

const mapStateToProps = ({ workshops }) => ({
  workshops: workshops.items,
});

const mapDispatchToProps = {
  fetchWorkshops: workshops.actions.fetchWorkshops,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopList);
