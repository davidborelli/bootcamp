import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

import Header from '../../../components/Header';

export default function DeafultLayout({ children }) {
  return (
    <S.Wrapper>
      <Header />
      {children}
    </S.Wrapper>
  );
}

DeafultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
