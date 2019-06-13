import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import PollItem from '../items/PollItem';
import { Collapse, Tooltip, Pagination } from 'antd';
import { Header, PaginationContainer } from './styles/List.styles';

interface IProps {
  polls: IPoll[];
  fetchPolls: (params?: { [key: string]: any }) => any;
}

const PollList: React.FC<IProps> = ({
  polls,
  fetchPolls,
}) => {
  useEffect(() => { fetchPolls(); }, [fetchPolls]);

  const header: (poll: IPoll) => JSX.Element = poll => (
    <Header>
      <span className="name">
        <Tooltip title={poll.name}>
          {poll.name}
        </Tooltip>
      </span>
      <span className="date">
        Encerra em {new Date(poll.deadline).toLocaleString()}
      </span>
    </Header>
  );

  const panels: JSX.Element[] = polls.map(poll =>
    <Collapse.Panel
      header={header(poll)}
      key={poll.id}
    >
      <PollItem poll={poll} />
    </Collapse.Panel>,
  );

  const handlePageChange = (page: number) => {
    fetchPolls({ page });
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

const mapStateToProps = ({ polls }) => ({
  polls: polls.items,
});

const mapDispatchToProps = {
  fetchPolls: polls.actions.fetchPolls,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
