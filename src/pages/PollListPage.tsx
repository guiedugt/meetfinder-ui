import React from 'react';
import { connect } from 'react-redux';

import PollFilter from '../components/filters/PollFilter';
import PollList from '../components/lists/PollList';
import { Spin } from 'antd';
import { Page, Title } from './styles/Page.styles';

interface IProps {
  loading: boolean;
}

const PollListPage: React.FC<IProps> = ({
  loading,
}) => {
  return (
    <Page>
      <Spin spinning={loading}>
        <Title>Enquetes</Title>
        <PollFilter />
        <PollList />
      </Spin>
    </Page>
  );
};

const mapStateToProps = ({ polls }) => ({
  loading: polls.loading,
});

export default connect(mapStateToProps)(PollListPage);
