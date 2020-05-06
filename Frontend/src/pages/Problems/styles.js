import styled from 'styled-components';

export const Container = styled.div`
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

export const ProblemList = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border-spacing: 0px 10px;
  max-width: 100%;

  > thead th {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 25px 0 0 0;
  }
  > tbody {
    tr {
      margin: 0;
      padding-top: 0;
      background: #333;
      text-align: center;

      td {
        padding: 10px 15px;
        color: #fff;
        font-size: 16px;
        height: 35px;

        &:first-of-type {
          border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
          border-radius: 0 4px 4px 0;
        }

        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 5px;
          object-fit: cover;
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

export const Description = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30vw;
`;
