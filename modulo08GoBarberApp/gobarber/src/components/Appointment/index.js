import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParser = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);
  return (
    <S.Container past={data.past}>
      <S.Left>
        <S.Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <S.Info>
          <S.Name>{data.provider.name}</S.Name>
          <S.Time>{dateParser}</S.Time>
        </S.Info>
      </S.Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </S.Container>
  );
}
