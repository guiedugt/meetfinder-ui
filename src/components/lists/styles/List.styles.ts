import styled from 'styled-components';

export const Header = styled.span`
  display: flex;
  .name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .date {
    font-size: .75rem;
    color: rgba(0, 0, 0, 0.6);
  }
  .delete {
    margin-left: 1rem;
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
`;
