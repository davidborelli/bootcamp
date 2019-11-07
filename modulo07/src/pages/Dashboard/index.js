import React from 'react';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import * as S from './styles';

export default function DashBoard() {
  return (
    <S.Container>
      <header>
        <button type="button">
          <MdNavigateBefore size={36} color="#FFF" />
        </button>
        <strong>30 de maio</strong>
        <button type="button">
          <MdNavigateNext size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        <S.Time past>
          <strong>08:00</strong>
          <span>Diego Fernandes</span>
        </S.Time>
        <S.Time available>
          <strong>09:00</strong>
          <span>Em aberto</span>
        </S.Time>
        <S.Time>
          <strong>10:00</strong>
          <span>Em aberto</span>
        </S.Time>
        <S.Time>
          <strong>11:00</strong>
          <span>Em aberto</span>
        </S.Time>
      </ul>
    </S.Container>
  );
}
