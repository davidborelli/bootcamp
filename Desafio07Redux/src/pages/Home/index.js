import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as S from './styles';

Icon.loadFont();

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    getProducts();
  }, []);

  handleAddProduct = id => {
    dispatch(CartActions.addToCartRequest(id));
  };

  renderProduct = ({ item }) => {
    return (
      <S.Product key={item.id}>
        <S.ProductImage source={{ uri: item.image }} />
        <S.ProductTitle>{item.title}</S.ProductTitle>
        <S.ProductPrice>{formatPrice(item.price)}</S.ProductPrice>
        <S.AddButton onPress={() => handleAddProduct(item.id)}>
          <S.ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <S.ProductAmountText>{amount[item.id] || 0}</S.ProductAmountText>
          </S.ProductAmount>
          <S.AddButtonText>ADICIONAR</S.AddButtonText>
        </S.AddButton>
      </S.Product>
    );
  };

  return (
    <S.Container>
      <FlatList
        horizontal
        data={products}
        extraData={this.props}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderProduct}
      />
    </S.Container>
  );
}
