import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

Icon.loadFont();

function Header({ navigation, cartSize }) {
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

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
