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

  > form {
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

export const DeliveryForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  background: #333;
  color: #fff;

  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;

    > div {
      display: block;

      strong {
        font-size: 18px;
        margin-bottom: 5px;
      }

      div.select-react__control {
        box-shadow: none;
        border: 0;
        margin-top: 10px;
        display: flex;
      }
      div.select-react__indicators {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div.select-react__menu {
        display: flex;
        flex-direction: column;
      }
    }
  }

  > strong {
    font-size: 18px;
    margin: 5px 0;
  }

  input {
    width: 100%;
    border: 0;
    border-radius: 4px;
    padding: 10px;
    color: #666;
  }
`;
