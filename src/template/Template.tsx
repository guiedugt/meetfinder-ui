import React from 'react';

import Header from './Header';
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
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Template;