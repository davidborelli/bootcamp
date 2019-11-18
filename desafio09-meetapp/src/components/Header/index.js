import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <S.Container>
      <>
        <S.Content>
          <nav>
            <img src={logo} alt="Logo MeetApp" />
          </nav>

          <aside>
            <S.Profile>
              <div>
                <strong>David Borelli</strong>
                <Link to="/profile">Meu perfil</Link>
              </div>
              <button type="button">Sair</button>
            </S.Profile>
          </aside>
        </S.Content>
      </>
    </S.Container>
  );
}
