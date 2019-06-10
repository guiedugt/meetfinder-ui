import React from 'react';

import LogoutButton from '../components/buttons/LogoutButton';
import { Container, Content, Title } from './styles/Header.styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Content>
        <Title>MeetFinder</Title>
        <LogoutButton />
      </Content>
    </Container>
  );
};

export default Header;
