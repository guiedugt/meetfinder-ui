import React from 'react';

import { Container, Content } from './styles/Header.styles';

interface IProps {
  children?: React.ReactNode;
}

const Template: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Content>
        Logs
      </Content>
    </Container>
  );
};

export default Template;
