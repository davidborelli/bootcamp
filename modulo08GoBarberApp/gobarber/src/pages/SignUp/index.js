import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signUpRequest } from '~/store/modules/auth/actions';

import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import * as S from './styles';

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(signUpRequest(name, email, password));
  };

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
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <S.FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <S.FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <S.SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </S.SubmitButton>

          <S.SignLink onPress={() => navigation.navigate('SignIn')}>
            <S.SignLinkText>Já tenho conta</S.SignLinkText>
          </S.SignLink>
        </S.Form>
      </S.Container>
    </Background>
  );
}
