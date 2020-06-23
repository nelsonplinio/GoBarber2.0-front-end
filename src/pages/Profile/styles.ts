import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  display: flex;
  flex-direction: column;

  > header {
    height: 144px;
    background: #28262e;
    width: 100%;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;

      svg {
        margin-left: 16px;
        color: #999591;
        height: 24px;
        width: 24px;
        transition: color 0.4s;
        &:hover {
          color: #ff9000;
        }
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin: 0 auto 32px auto;
  position: relative;
  width: fit-content;
  align-self: center;

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #ff9000;
    right: 0;
    bottom: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s;

    cursor: pointer;
    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.1, '#ff9000')};
    }

    svg {
      font-size: 24px;
      color: #312e38;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: -180px auto 0;

  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.4s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
