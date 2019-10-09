import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as S from './styles';

export default function Cart() {
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
          <tr>
            <td>
              <img
                src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
                alt="Tênis"
              />
            </td>
            <td>
              <strong>Tênis bacanudo</strong>
              <span>R$127,77</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={2} />
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
