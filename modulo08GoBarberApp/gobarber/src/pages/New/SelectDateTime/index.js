import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import * as S from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    const loadAvailable = async () => {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    };

    loadAvailable();
  }, [date, provider.id]);

  const handleSelectHour = time => {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  };

  return (
    <Background>
      <S.Container>
        <DateInput date={date} onChange={setDate} />

        <S.HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <S.Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <S.Title>{item.time}</S.Title>
            </S.Hour>
          )}
        />
      </S.Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
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
