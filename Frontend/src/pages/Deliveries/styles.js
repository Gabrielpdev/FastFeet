import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  @import '//netdna.bootstrapcdn.com/font-awesome/3.0/css/font-awesome.css';

  max-width: 1000px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  > strong {
    color: #fff;
    font-size: 30px;
    text-align: left;
    margin-bottom: 15px;
  }

  > div.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div.search {
      padding: 0;

      background: #fff;
      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      i {
        margin: 5px 0 0 10px;
        background: none;
        border: 0;
      }

      input {
        width: 100%;
        max-width: 250px;
        border-radius: 4px;
        border: 0;
        padding: 7px;
      }
    }

    button.cadastro {
      border-radius: 4px;
      border: 0;
      padding: 7px;
      color: #fff;
      background: #990000;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 5px;
      }
    }
  }

  > div.pagination {
    margin: 0 0 0 auto;
    button {
      width: 30px;
      height: 30px;
      background: #990000;
      border: 0;
      padding: 5px;
      border-radius: 4px;

      & + button {
        margin-left: 5px;
      }
    }
  }
`;

export const DeliveryList = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border-spacing: 0px 15px;
  max-width: 100%;

  div {
    display: flex;
    justify-content: center;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 5px;
      object-fit: cover;
    }
  }

  > thead th {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 25px;
    padding-bottom: 0px;
    &:last-child {
      text-align: center;
    }
  }
  > tbody {
    tr {
      background: #333;
      text-align: center;

      td {
        padding: 5px 15px;
        color: #fff;
        font-size: 16px;
        height: 35px;

        &:first-of-type {
          border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
          border-radius: 0 4px 4px 0;
        }

        li {
          list-style: none;
          flex-direction: column;
          > button {
            width: 110px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            align-items: right;
            padding: 5px;
            background: none;
            border: 0;
            color: #fff;

            &:hover {
              color: #990000;
            }

            svg {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
`;

export const DeliveryStatus = styled.span`
  margin: auto;
  width: 110px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  font-size: 13px;

  ${(props) =>
    props.status === 'ENTREGUE' &&
    css`
       {
        color: ${lighten(0.3, '#25851C')};

        background: #25851c;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 6px;
        background: ${lighten(0.3, '#25851C')};
      }
    `}

  ${(props) =>
    props.status === 'RETIRADO' &&
    css`
       {
        color: ${lighten(0.3, '#857816')};

        background: #857816;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 6px;
        background: ${lighten(0.3, '#857816')};
      }
    `}

    ${(props) =>
      props.status === 'CANCELADO' &&
      css`
         {
          color: ${lighten(0.3, '#8D1710')};

          background: #8d1710;
        }
        &::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          margin-right: 6px;
          background: ${lighten(0.3, '#8D1710')};
        }
      `}

    ${(props) =>
      props.status === 'PENDENTE' &&
      css`
         {
          color: ${lighten(0.3, '#737270')};
          background: #4d4c4a;
        }
        &::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          margin-right: 6px;
          background: ${lighten(0.3, '#737270')};
        }
      `}
`;
