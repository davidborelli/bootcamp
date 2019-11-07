import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import * as S from './styles';

export default function DashBoard() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const handlePrevDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  return (
    <S.Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdNavigateBefore size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handlePrevDay}>
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
