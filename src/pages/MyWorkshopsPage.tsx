import React from 'react';
import { connect } from 'react-redux';

import MyWorkshopsFilter from '../components/filters/MyWorkshopsFilter';
import MyWorkshopsList from '../components/lists/MyWorkshopsList';
import { Spin } from 'antd';
import { Page, Title } from './styles/Page.styles';

interface IProps {
  loading: boolean;
}

const MyWorkshopsPage: React.FC<IProps> = ({
  loading,
}) => {
  return (
    <Page>
      <Spin spinning={loading}>
        <Title>Workshops</Title>
        <MyWorkshopsFilter />
        <MyWorkshopsList />
      </Spin>
    </Page>
  );
};

const mapStateToProps = ({ workshops }) => ({
  loading: workshops.loading,
});

export default connect(mapStateToProps)(MyWorkshopsPage);
