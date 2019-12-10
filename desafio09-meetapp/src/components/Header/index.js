import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import * as S from './styles';

import logo from '../../assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <S.Container>
      <>
        <S.Content>
          <nav>
            <Link to="/">
              <img src={logo} alt="Logo MeetApp" />
            </Link>
          </nav>

          <aside>
            <S.Profile>
              <div>
                <strong>{profile.name}</strong>
                <Link to="/profile">Meu perfil</Link>
              </div>
              <button type="button" onClick={handleSignOut}>
                Sair
              </button>
            </S.Profile>
          </aside>
        </S.Content>
      </>
    </S.Container>
  );
}
