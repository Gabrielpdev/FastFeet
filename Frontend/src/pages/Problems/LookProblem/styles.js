import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  background: rgba(0, 0, 0, 0.5);

  > div {
    margin: auto;
    max-height: 400px;
    max-width: 360px;

    background: #444;
    color: #fff;
    border-radius: 5px;
    padding: 15px 5px;

    strong {
      margin: 10px;
      font-size: 20px;
    }

    span {
      margin-top: 10px;
    }
  }
`;
export const Scroll = styled(PerfectScrollBar)`
  max-height: 300px;

  padding: 5px 15px;
`;
