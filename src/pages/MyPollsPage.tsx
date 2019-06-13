import React from 'react';
import { connect } from 'react-redux';

import MyPollsFilter from '../components/filters/MyPollsFilter';
import CreatePollModal from '../components/modals/CreatePollModal';
import MyPollsList from '../components/lists/MyPollsList';
import { Spin } from 'antd';
import { Page, Title, Row, Col } from './styles/Page.styles';

interface IProps {
  loading: boolean;
}

const MyPollsPage: React.FC<IProps> = ({
  loading,
}) => {
  return (
    <Page>
      <Spin spinning={loading}>
        <Title>Enquetes</Title>
        <Row>
          <Col block={true}>
            <MyPollsFilter />
          </Col>
          <Col style={{ paddingBottom: 24 }}>
            <CreatePollModal />
          </Col>
        </Row>
        <MyPollsList />
      </Spin>
    </Page>
  );
};

const mapStateToProps = ({ polls }) => ({
  loading: polls.loading,
});

export default connect(mapStateToProps)(MyPollsPage);
