import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  width: 100%;
  color: #666360;
  overflow: hidden;
  padding: 16px;

  & + div {
    margin-top: 8px;
  }

  input {
    width: 100%;
    background: transparent !important;
    border: 0;
    flex: 1;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;
