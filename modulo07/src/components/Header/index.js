import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo-purple.svg';

import * as S from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <>
      <S.Container>
        <S.Content>
          <nav>
            <img src={logo} alt="Logo GoBarber" />
            <Link to="/dashboard">Dashboard</Link>
          </nav>

          <aside>
            <Notifications />

            <S.Profile>
              <div>
                <strong>{profile.name}</strong>
                <Link to="/profile">Meu perfil</Link>
              </div>
              <img
                src={
                  profile.avatar.url ||
                  'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt="Usuário avatar"
              />
            </S.Profile>
          </aside>
        </S.Content>
      </S.Container>
    </>
  );
}
