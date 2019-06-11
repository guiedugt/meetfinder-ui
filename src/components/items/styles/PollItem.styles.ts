import styled from 'styled-components';

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  > :first-child { margin-right: 1rem; }
  > * { flex: 1; }
`;

export const Subjects = styled.div`

`;

export const Subject = styled.div`
  display: flex;
  .subject-name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .subject-votes {
    margin-right: 0.5rem;
    @media only screen and (max-width: 720px) {
      display: none;
    }
  }
  .subject-progress {
    width: 65%;
    @media only screen and (max-width: 550px) {
      width: 50%;
    }
  }
`;
