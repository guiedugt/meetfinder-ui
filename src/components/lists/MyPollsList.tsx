import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import PollItem from '../items/PollItem';
import ScheduleWorkshopModal from '../modals/ScheduleWorkshopModal';
import { Collapse, Tooltip, Pagination } from 'antd';
import { Header, PaginationContainer } from './styles/List.styles';

interface IProps {
  user: IUser;
  polls: IPoll[];
  fetchMyPolls: (params?: { [key: string]: any }) => any;
}

const MyPollsList: React.FC<IProps> = ({
  user,
  polls,
  fetchMyPolls,
}) => {
  useEffect(() => { fetchMyPolls(); }, [fetchMyPolls]);

  const header: (poll: IPoll) => JSX.Element = (poll) => {
    const isMine = poll.owner.id === user.id;
    const isVoting = new Date() < new Date(poll.deadline);

    return (
      <Header>
        <span className="name">
          <Tooltip title={poll.name}>
            {poll.name}
          </Tooltip>
        </span>
        <span className="date">
          {isVoting && `Encerra em ${new Date(poll.deadline).toLocaleString()}`}
          {!isVoting && isMine && <ScheduleWorkshopModal poll={poll} />}
        </span>
      </Header>
    );
  };

  const panels: JSX.Element[] = polls.map(poll =>
    <Collapse.Panel
      header={header(poll)}
      key={poll.id}
    >
      <PollItem poll={poll} />
    </Collapse.Panel>,
  );

  const handlePageChange = (page: number) => {
    fetchMyPolls({ page });
  };

  return (
    <Fragment>
      <Collapse
        accordion={true}
        bordered={false}
      >
        {panels}
      </Collapse>
      <PaginationContainer>
        <Pagination
          total={polls['count']}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </Fragment>
  );
};

const mapStateToProps = ({ auth, polls }) => ({
  user: auth.user,
  polls: polls.items,
});

const mapDispatchToProps = {
  fetchMyPolls: polls.actions.fetchMyPolls,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPollsList);
