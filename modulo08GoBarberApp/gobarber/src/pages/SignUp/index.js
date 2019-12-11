import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import * as S from './styles';

export default function SignUp({ navigation }) {
  return (
    <Background>
      <S.Container>
        <Image source={logo} />

        <S.Form>
          <S.FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
          />

          <S.FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
          />

          <S.SubmitButton onPress={() => {}}>Acessar</S.SubmitButton>

          <S.SignLink onPress={() => navigation.navigate('SignUp')}>
            <S.SignLinkText>Criar conta gratuita</S.SignLinkText>
          </S.SignLink>
        </S.Form>
      </S.Container>
    </Background>
  );
}
