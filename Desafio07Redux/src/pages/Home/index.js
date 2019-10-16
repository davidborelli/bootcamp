import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as S from './styles';

Icon.loadFont();

class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  renderProduct = ({ item }) => {
    const { amount } = this.props;

    return (
      <S.Product key={item.id}>
        <S.ProductImage source={{ uri: item.image }} />
        <S.ProductTitle>{item.title}</S.ProductTitle>
        <S.ProductPrice>{formatPrice(item.price)}</S.ProductPrice>
        <S.AddButton onPress={() => this.handleAddProduct(item.id)}>
          <S.ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <S.ProductAmountText>{amount[item.id] || 0}</S.ProductAmountText>
          </S.ProductAmount>
          <S.AddButtonText>ADICIONAR</S.AddButtonText>
        </S.AddButton>
      </S.Product>
    );
  };

  render() {
    const { products } = this.state;
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
