import React from 'react';
import { connect } from 'react-redux';

import WorkshopFilter from '../components/filters/WorkshopFilter';
import WorkshopList from '../components/lists/WorkshopList';
import { Spin } from 'antd';
import { Page, Title } from './styles/Page.styles';

interface IProps {
  loading: boolean;
}

const WorkshopsPage: React.FC<IProps> = ({
  loading,
}) => {
  return (
    <Page>
      <Spin spinning={loading}>
        <Title>Workshops</Title>
        <WorkshopFilter />
        <WorkshopList />
      </Spin>
    </Page>
  );
};

const mapStateToProps = ({ workshops }) => ({
  loading: workshops.loading,
});

export default connect(mapStateToProps)(WorkshopsPage);
