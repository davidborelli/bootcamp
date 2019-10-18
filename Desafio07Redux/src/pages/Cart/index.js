import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../../util/format';
import * as S from './styles';

Icon.loadFont();

export default function Cart() {
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      priceFormated: formatPrice(product.price),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  return (
    <S.Container>
      {products.length ? (
        <>
          <S.Products>
            {products.map(product => (
              <S.Product key={product.id}>
                <S.ProductInfo>
                  <S.ProductImage source={{ uri: product.image }} />
                  <S.ProductDetails>
                    <S.ProductTitle>{product.title}</S.ProductTitle>
                    <S.ProductPrice>{product.priceFormatted}</S.ProductPrice>
                  </S.ProductDetails>
                  <S.ProductDelete
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <Icon name="delete-forever" size={24} color="#7159c1" />
                  </S.ProductDelete>
                </S.ProductInfo>
                <S.ProductControls>
                  <S.ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </S.ProductControlButton>
                  <S.ProductAmount value={String(product.amount)} />
                  <S.ProductControlButton onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </S.ProductControlButton>
                  <S.ProductSubtotal>{product.subtotal}</S.ProductSubtotal>
                </S.ProductControls>
              </S.Product>
            ))}
          </S.Products>
          <S.TotalContainer>
            <S.TotalText>TOTAL</S.TotalText>
            <S.TotalAmount>{total}</S.TotalAmount>
            <S.Order>
              <S.OrderText>FINALIZAR PEDIDO</S.OrderText>
            </S.Order>
          </S.TotalContainer>
        </>
      ) : (
        <S.EmptyContainer>
          <Icon name="remove-shopping-cart" size={24} color="#eee" />
          <S.EmptyText>Seu carrinho está vazio.</S.EmptyText>
        </S.EmptyContainer>
      )}
    </S.Container>
  );
}
