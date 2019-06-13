import React from 'react';

import Header from './Header';
import Menu from './Menu';
import { Container, Content } from './styles/Template.styles';

interface IProps {
  children?: React.ReactNode;
}

const Template: React.FC<IProps> = ({
  children,
}) => {
  return (
    <Container>
      <Header />
      <Menu />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Template;
