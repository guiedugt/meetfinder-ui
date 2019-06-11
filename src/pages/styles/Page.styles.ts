import styled from 'styled-components';

export const Page = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.75rem;
  width: 100%;
  max-width: 60rem;
`;

interface IContainerProps {
  center?: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  max-width: 30rem;
  ${props => props.center && 'margin: auto;'}
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
`;

interface IColProps {
  block?: boolean;
}

export const Col = styled.div<IColProps>`
  ${p => p.block && `
    flex: 1;
    :not(:last-child) { margin-right: 1rem; }
  `}
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
`;
