import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  > button {
    border: 0;
    background: none;
  }
`;

export const List = styled.div`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  z-index: 1;

  position: absolute;
  width: 130px;
  left: calc(50% - 65px);
  top: calc(100% + 10px);

  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;
