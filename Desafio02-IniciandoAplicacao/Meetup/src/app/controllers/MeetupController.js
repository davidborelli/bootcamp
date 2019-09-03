// import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    res.json({ response: 'ok' });
  }
}

export default new MeetupController();
