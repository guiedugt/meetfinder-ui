import React from 'react';
import { connect } from 'react-redux';

import PollFilter from '../components/filters/PollFilter';
import CreatePollModal from '../components/modals/CreatePollModal';
import PollList from '../components/lists/PollList';
import { Spin } from 'antd';
import { Page, Title, Row, Col } from './styles/Page.styles';

interface IProps {
  loading: boolean;
}

const PollsPage: React.FC<IProps> = ({
  loading,
}) => {
  return (
    <Page>
      <Spin spinning={loading}>
        <Title>Enquetes</Title>
        <Row>
          <Col block={true}>
            <PollFilter />
          </Col>
          <Col style={{ paddingBottom: 24 }}>
            <CreatePollModal />
          </Col>
        </Row>
        <PollList />
      </Spin>
    </Page>
  );
};

const mapStateToProps = ({ polls }) => ({
  loading: polls.loading,
});

export default connect(mapStateToProps)(PollsPage);
