import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content:center;


    }

    svg{
      position: absolute;
      display:none;
    }

    &:hover {
      opacity: 0.5;

      svg {
        display:flex;
      }
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #fff;
    }

    input {
      display: none;
    }
  }

`;
