import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, View, Text } from 'native-base';
import React from 'react';
import { Button, TextButton, ImageWrapper, Content, Title, SubTitle, TextWrapper, Header, Icon } from './styles';
import UnionSvg from '../../assets/Union.svg'
import { SuccessScreamRouteProps } from '../../global/navigation';

export function Success() {
  const navigation = useNavigation();
  const { params } = useRoute<SuccessScreamRouteProps>();

  const type = params ? params.type : "";

  function back() {
    navigation.navigate('CarList')
  }

  return (
    <View flex="1" bg="muted.900" alignContent="center">
      <Header>
        <UnionSvg style={{
          width: '100%',
        }} />
      </Header>
      <Content>
        <ImageWrapper>
          <Icon name="check" />
        </ImageWrapper>

        <TextWrapper>
          <Title>Sucesso!</Title>
          <SubTitle>O cadatro foi {type==='edit' ? 'atualizado' : 'realizado'} com sucesso</SubTitle>
        </TextWrapper>

        <Button onPress={back}>
          <TextButton>Ok</TextButton>
        </Button>
      </Content>
    </View>
  )
}
