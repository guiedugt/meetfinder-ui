import styled from 'styled-components';

export const Header = styled.span`
  display: flex;
  .poll-name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .poll-deadline {
    font-size: .75rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;
