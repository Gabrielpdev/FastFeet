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
    height: 100%;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 10px;

      > strong {
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

export const RecipientForm = styled.form`
  border-radius: 4px;
  padding: 15px;
  background: #333;
  color: #fff;

  strong {
    font-size: 20px;
    margin-top: 30px;
  }

  input {
    width: 100%;
    border-radius: 4px;
    border: 0;
    padding: 15px;
    color: #666;
    margin-bottom: 10px;
  }

  > div.linha2 {
    display: grid;
    grid-template-columns: 3fr 1.2fr 1.5fr;
    grid-gap: 10px;
    > div {
      display: block;
      width: 100%;
    }
  }
  > div.linha3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    > div {
      display: block;
      width: 100%;
    }
  }
`;
