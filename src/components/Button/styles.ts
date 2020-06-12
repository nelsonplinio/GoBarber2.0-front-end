import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  loading?: number;
}

const pulseAnimation = keyframes`
  0% {
    opacity: 0.65;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.65;
  }
`;

export const Container = styled.button<ContainerProps>`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background 0.4s;
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  ${({ loading }) =>
    loading &&
    css`
      animation: ${pulseAnimation} 1s infinite;
      cursor: not-allowed;
    `}
`;
