import React, { useMemo } from 'react';
import { formatRelative, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import * as S from './styles';
import api from '~/services/api';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormated = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: pt,
      }),

    [time]
  );

  const handleAppointment = async () => {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <S.Container>
        <S.Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <S.Name>{provider.name}</S.Name>
        <S.Time>{dateFormated}</S.Time>
        <S.SubmitButton onPress={handleAppointment}>
          Confirmar agendamento
        </S.SubmitButton>
      </S.Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
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
