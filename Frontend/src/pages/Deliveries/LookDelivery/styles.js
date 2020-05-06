import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);
  > div {
    margin: auto;
    max-height: 450px;
    max-width: 360px;

    background: #444;
    color: #fff;
    border-radius: 5px;
    padding: 25px;
    flex-direction: column;
  }
`;

export const Delivery = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 10px;

  strong {
    font-size: 25px;
    margin-bottom: 10px;
  }

  span + span + span {
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const Date = styled.div`
  flex-direction: column;
  display: flex;

  border-top: 1px solid #333;

  strong {
    font-size: 20px;
    margin-top: 10px;
  }

  span ~ span {
    margin-bottom: 10px;
  }
`;

export const Signature = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #333;

  strong {
    font-size: 20px;
    margin: 10px 0;
  }

  img {
    max-width: 350px;
    max-height: 70px;
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 100px;
  padding: 5px 15px;
`;
