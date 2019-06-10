import styled from 'styled-components';

export const Container = styled.header`
  background: #fff;
  box-shadow: 0 0 2px 0 darkgrey;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  `;

export const Content = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) { margin-right: 1rem; }
  svg { max-height: 4rem; }
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
`;
