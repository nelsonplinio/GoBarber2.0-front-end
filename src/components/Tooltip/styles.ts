import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    color: #312e38;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);

    /**Hack para colocar elemente com position absolute no centro */
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';

      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    min-height: 20px;
    visibility: visible;
  }
`;
