import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import AvatarMeetup from './AvatarMeetup';
import { newMeetupRequest } from '../../store/modules/meetup/actions';

import * as S from './styles';
import DatePicker from '../../components/DatePicker';

const schema = Yup.object().shape({
  avatar_id: Yup.number().transform(value => (!value ? undefined : value)),
  title: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .required('O título é obrigatório'),
  description: Yup.string()
    .min(5, 'No mínimo 5 caracteres')
    .required('A descrição é obrigatória'),
  location: Yup.string()
    .min(5, 'No mínimo 5 caracteres')
    .required('A localização é obrigatória'),
  date: Yup.date().required('Data é obrigatória'),
});

export default function Meetup({ location }) {
  let meetupLocated = location.state ? location.state.meetupLocated : null;

  if (meetupLocated) {
    meetupLocated = {
      ...meetupLocated,
      date: parseISO(meetupLocated.date),
    };
  }

  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    data = {
      ...data,
      profile,
    };
    dispatch(newMeetupRequest(data, meetupLocated));
  }

  return (
    <S.Container>
      <Form initialData={meetupLocated} onSubmit={handleSubmit} schema={schema}>
        <AvatarMeetup name="avatar_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <DatePicker name="date" type="date" placeholder="Data do Meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">Salvar meetup</button>
      </Form>
    </S.Container>
  );
}

Meetup.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

Meetup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
