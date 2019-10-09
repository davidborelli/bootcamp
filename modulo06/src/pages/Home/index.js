import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import * as S from './styles';

export default function Home() {
  return (
    <S.ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-shox-nz-se-/72/D12-2761-172/D12-2761-172_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis bacanudo</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </S.ProductList>
  );
}
