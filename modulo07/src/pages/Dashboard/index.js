import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import api from '~/services/api';

import * as S from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function DashBoard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    const loadSchedule = async () => {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(agendamento =>
            isEqual(parseISO(agendamento.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    };

    loadSchedule();
  }, [date]);

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
        <button type="button" onClick={handleNextDay}>
          <MdNavigateNext size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <S.Time
            key={time.time}
            past={time.past}
            available={!time.appointment}
          >
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </S.Time>
        ))}
      </ul>
    </S.Container>
  );
}
