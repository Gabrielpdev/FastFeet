import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const PendingView = styled.View`
  flex: 1;
  background: #000;
  justify-content: center;
  align-items: center;
`;

export const Camera = styled(RNCamera)`
  width: 100%;
  height: 100%;

  justify-content: flex-end;
  align-items: center;
`;
export const ViewButton = styled.View`
  flex: 1;
  background: #fff;
  padding: 10px;
  max-height: 60px;
  max-width: 60px;
  border-radius: 30px;

  margin-bottom: 5px;

  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(TouchableOpacity)``;

export const Preview = styled.Image`
  width: 100%;
  height: 80%;
  margin-top: auto;
`;

export const ViewCloseButton = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  border: 0;

  position: absolute;
  right: 0;
  top: 5px;
`;

export const CloseButton = styled(TouchableOpacity)`
  height: 62px;
  width: 62px;
  border-radius: 31px;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled(Button)`
  background: #ff0000;
  margin: 10px 10px 0 10px;
  align-self: stretch;
  opacity: ${(props) => (props.enabled ? 1 : 0.6)};
`;
