import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(#000, #3d0000);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  max-height: 500px;
  text-align: center;
  padding: 15px;

  border-radius: 4px;
  background: #333;

  img {
    width: 300px;
    margin: 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      text-align: left;
      color: #fff;
    }

    input {
      background: rgba(255, 255, 255, 0.8);
      border: 0;
      padding: 0 15px;
      height: 44px;
      margin: 5px 0 10px;
      color: #333;
      border-radius: 4px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    span {
      color: #e81c1c;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      height: 44px;
      background: #ed0e00;
      padding: 0 15px;
      margin: 10px 0 0;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ed0e00')};
      }
    }
  }
`;
