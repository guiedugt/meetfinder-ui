import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import workshops from '../../store/workshops';

import WorkshopItem from '../items/WorkshopItem';
import EditWorkshopModal from '../modals/EditWorkshopModal';
import DeleteWorkshopButton from '../buttons/DeleteWorkshopButton';
import { Collapse, Tooltip } from 'antd';
import { Header } from './styles/List.styles';

interface IProps {
  workshops: IWorkshop[];
  fetchMyWorkshops: (params?: { [key: string]: any }) => any;
}

const MyWorkshopsList: React.FC<IProps> = ({
  workshops,
  fetchMyWorkshops,
}) => {
  useEffect(() => { fetchMyWorkshops(); }, [fetchMyWorkshops]);

  const header: (workshop: IWorkshop) => JSX.Element = workshop => (
    <Header>
      <span className="name">
        <Tooltip title={workshop.name}>
          {workshop.name}
        </Tooltip>
      </span>
      <span className="date">
        <EditWorkshopModal workshop={workshop}>
          Agendado para {new Date(workshop.date).toLocaleString()}
        </EditWorkshopModal>
      </span>
      <span className="delete">
        <DeleteWorkshopButton workshop={workshop} />
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
  fetchMyWorkshops: workshops.actions.fetchMyWorkshops,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWorkshopsList);
