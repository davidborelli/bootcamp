export function newMeetupRequest(data, meetup) {
  return {
    type: '@meetup/NEW_MEETUP_REQUEST',
    payload: data,
    meetup,
  };
}
