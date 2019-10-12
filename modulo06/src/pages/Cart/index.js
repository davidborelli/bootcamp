import React from 'react';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import * as S from './styles';

function Cart({ cart, removeFromCart, updateAmount, total }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <S.Container>
      <S.ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(cartItem => (
            <tr key={cartItem.id}>
              <td>
                <img src={cartItem.image} alt={cartItem.title} />
              </td>
              <td>
                <strong>{cartItem.title}</strong>
                <span>{cartItem.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(cartItem)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={cartItem.amount} />
                  <button type="button" onClick={() => increment(cartItem)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{cartItem.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </S.ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <S.Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </S.Total>
      </footer>
    </S.Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
