import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import * as S from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <Background>
      <S.Container>
        <S.Title>Agendamentos</S.Title>

        <S.List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Appointment data={item} />}
        />
      </S.Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
