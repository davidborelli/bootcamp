import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

Icon.loadFont();

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo />
        <S.BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <S.ItemCount>{cartSize || 0}</S.ItemCount>
        </S.BasketContainer>
      </S.Container>
    </S.Wrapper>
  );
}
