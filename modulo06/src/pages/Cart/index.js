import React from 'react';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as S from './styles';

function Cart({ cart }) {
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
          {cart.map((cartItem, idx) => (
            <tr key={idx}>
              <td>
                <img src={cartItem.image} alt={cartItem.title} />
              </td>
              <td>
                <strong>{cartItem.title}</strong>
                <span>{cartItem.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={cartItem.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$255,54</strong>
              </td>
              <td>
                <button type="button">
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
          <strong>R$777,77</strong>
        </S.Total>
      </footer>
    </S.Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
