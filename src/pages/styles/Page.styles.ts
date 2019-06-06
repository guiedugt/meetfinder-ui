import styled from 'styled-components';

export const Page = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.75rem;
  width: 100%;
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

export const UploadTitle = styled.h2`
  font-weight: 400;
  font-size: 1.8rem;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
`;
