import React from 'react';

import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import LogoutButton from '../components/buttons/LogoutButton';
import { Container, Content, Group, Title } from './styles/Header.styles';

interface IProps {
  children?: React.ReactNode;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Content>
        <Group>
          <Title>MeetFinder</Title>
        </Group>
        <Group>
          <ChangePasswordModal />
          <LogoutButton />
        </Group>
      </Content>
    </Container>
  );
};

export default Header;
