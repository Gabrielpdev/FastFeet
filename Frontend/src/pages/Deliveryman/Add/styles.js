import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  text-align: center;
  svg {
    height: 60px;
    width: 60px;
    color: #ddd;
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  span {
    color: #e81c1c;
    margin: 0 0 10px;
    font-weight: bold;
  }

  form {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 10px;

      strong {
        font-size: 30px;
        color: #fff;
      }

      > div {
        width: 180px;
        display: flex;
        justify-content: space-between;
        button {
          display: flex;
          align-items: center;
          padding: 5px;
          border: 0;
          border-radius: 4px;
          color: #fff;
          background: #990000;

          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
`;

export const DeliverymanForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  background: #333;
  color: #fff;

  strong {
    font-size: 18px;
    margin: 10px 0;
  }

  input {
    width: 100%;
    border: 0;
    border-radius: 4px;
    padding: 10px;
    color: #666;
  }
`;
