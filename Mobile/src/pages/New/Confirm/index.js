import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';
import { Alert, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '~/services/api';

import Background from '~/components/Background';
import {
  Container,
  Camera,
  ViewButton,
  SubmitButton,
  PendingView,
  Preview,
  ViewCloseButton,
  CloseButton,
  SendButton,
} from './styles';

export default function Confirm({ navigation }) {
  const { id } = navigation.getParam('delivery');

  const [picture, setPicture] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };

    const data = await camera.takePictureAsync(options);
    setPicture(data.uri);
    setConfirm(false);
  }

  function handleCancel() {
    setPicture(null);
  }

  async function handleSubmit() {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    setConfirm(false);
    setLoading(true);

    try {
      const data = new FormData();
      data.append('file', {
        type: 'image/jpeg',
        uri: picture,
        name: picture.split('/').pop(),
      });

      const response = await api.post('files', data);

      const signature_id = response.data.id;

      await api.put(`delivery/${id}/finish`, {
        signature_id,
      });

      Toast.show('Entrega finalizada');
      setLoading(false);
      navigation.navigate('Deliveries');
    } catch (err) {
      console.tron.log({ err });
      Alert.alert(
        'Erro ao confirmar entrega',
        'Não foi possível confirmar a entrega'
      );
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        {picture ? (
          <>
            <ViewCloseButton>
              <CloseButton onPress={handleCancel}>
                <Icon color="#FFFFFF" size={36} name="close" />
              </CloseButton>
            </ViewCloseButton>
            <Preview source={{ uri: picture }} />
          </>
        ) : (
          <Camera
            picture={!!picture}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permissão para o uso da câmera',
              message: 'Nós precisamos da sua permição para o uso da câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status }) => {
              if (status !== 'READY')
                return (
                  <PendingView>
                    <Text style={{ color: '#fff' }}>Carregando</Text>
                  </PendingView>
                );
              return (
                <ViewButton>
                  <SubmitButton onPress={() => takePicture(camera)}>
                    <Icon name="camera" size={40} color="#000" />
                  </SubmitButton>
                </ViewButton>
              );
            }}
          </Camera>
        )}
        <SendButton
          enabled={!!picture}
          onPress={handleSubmit}
          loading={loading}
        >
          {confirm ? 'Tem certeza que deseja enviar?' : 'Enviar'}
        </SendButton>
      </Container>
    </Background>
  );
}
Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Voltar',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
