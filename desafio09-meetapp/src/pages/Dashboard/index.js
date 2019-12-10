import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdHelpOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import history from '../../services/history';
import api from '../../services/api';

import * as S from './styles';

export default function Dashboard() {
  const [meetup, setMeetup] = useState([]);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    const loadMeetups = async () => {
      const response = await api.get(`meetups?user=${profile.id}`);

      if (response.data.length <= 0) return;

      const data = response.data.map(meetupLocated => ({
        ...meetupLocated,
        title: meetupLocated.title,
        dateFormated: format(
          new Date(meetupLocated.date),
          "d 'de' MMMM, 'às' p'h'",
          { locale: pt }
        ),
      }));
      setMeetup(data);
    };

    loadMeetups();
  }, [profile.id]);

  function handleDirectToHome() {
    history.push('/meetup');
  }

  return (
    <S.Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleDirectToHome}>
          <MdHelpOutline size={34} color="#FFF" />
          <span>Novo meetup</span>
        </button>
      </header>

      <ul>
        {meetup.map(meetupLocated => (
          <Link
            to={{ pathname: '/meetup', state: { meetupLocated } }}
            key={meetupLocated.id}
          >
            <S.Scheduling>
              <strong>{meetupLocated.title}</strong>
              <div>
                <span>{meetupLocated.dateFormated}</span>
                <MdHelpOutline size={24} color="#FFF" />
              </div>
            </S.Scheduling>
          </Link>
        ))}
      </ul>
    </S.Container>
  );
}
