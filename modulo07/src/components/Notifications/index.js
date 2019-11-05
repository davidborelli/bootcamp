import React from 'react';
import { MdNotifications } from 'react-icons/md';

import * as S from './styles';

export default function Notifications() {
  return (
    <>
      <S.Container>
        <S.Badge hasUnread>
          <MdNotifications color="#7159c1" size={20} />
        </S.Badge>

        <S.NotificationList>
          <S.Scroll>
            <S.Notification unread>
              <p>Você possui um novo agendamento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </S.Notification>
            <S.Notification>
              <p>Você possui um novo agendamento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </S.Notification>
            <S.Notification>
              <p>Você possui um novo agendamento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </S.Notification>
            <S.Notification>
              <p>Você possui um novo agendamento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </S.Notification>
            <S.Notification>
              <p>Você possui um novo agendamento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </S.Notification>
          </S.Scroll>
        </S.NotificationList>
      </S.Container>
    </>
  );
}
