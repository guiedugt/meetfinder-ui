import styled from 'styled-components';

export const Container = styled.header`
  background: #fff;
  box-shadow: 0 0 2px 0 darkgrey;
  padding: 1rem;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: 90rem;
  justify-content: space-between;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) { margin-right: 1rem; }
  svg { max-height: 4rem; }
`;
