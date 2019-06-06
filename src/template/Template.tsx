import React from 'react';

import { Container, Content } from './styles/Template.styles';

interface IProps {
  children: React.ReactNode;
}

const Template: React.FC<IProps> = ({
  children,
}) => {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Template;
