import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

function* newMeetup(payload) {
  console.tron.log(payload);
  try {
    const { avatar_id, title, description, date, location, profile } = payload;

    yield call(api.post, 'meetups', {
      title,
      description,
      location,
      date,
      user_id: profile.id,
      avatar_id,
    });

    toast.success('Meetup salvo com sucesso');
  } catch (error) {
    toast.error('Falha ao gravar Meetup, verifique os dados...');
  }
}

function* editMeetup({ payload, id }) {
  try {
    const { avatar_id, title, description, date, location, profile } = payload;

    yield call(api.put, `meetups/${id}`, {
      title,
      description,
      location,
      date,
      user_id: profile.id,
      avatar_id,
    });

    toast.success('Meetup atualizado com sucesso');
  } catch (error) {
    toast.error('Falha ao atualizar Meetup, verifique os dados...');
  }
}

export function* newOrUpdateMeetup(data) {
  const { payload, meetup } = data;

  if (meetup) {
    yield editMeetup({ payload, id: meetup.id });
  } else {
    yield newMeetup(payload);
  }
}

export default all([
  takeLatest('@meetup/NEW_MEETUP_REQUEST', newOrUpdateMeetup),
]);
