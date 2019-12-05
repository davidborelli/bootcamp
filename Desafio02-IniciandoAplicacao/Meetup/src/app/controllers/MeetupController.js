import * as Yup from 'yup';
import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { date, page, user } = req.query;

    const filterDate = date ? parseISO(date) : null;
    const informedPage = page || 1;
    const filterUser = user;

    const where = {};

    if (filterDate) {
      where.date = {
        [Op.between]: [startOfDay(filterDate), endOfDay(filterDate)],
      };
    }

    if (filterUser) {
      where.user_id = filterUser;
    }

    const meetups = await Meetup.findAll({
      where: filterDate || filterUser ? where : null,
      order: ['date'],
      limit: 10,
      offset: (informedPage - 1) * 10,
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(3),
      description: Yup.string()
        .required()
        .min(5),
      location: Yup.string()
        .required()
        .min(5),
      date: Yup.date().required(),
      banner: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, banner, user_id } = req.body;
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      banner,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(3),
      description: Yup.string()
        .required()
        .min(5),
      location: Yup.string()
        .required()
        .min(5),
      date: Yup.date().required(),
      banner: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date } = req.body;

    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You are not owner this meetup' });
    }

    const meetupUpdated = await meetup.update(req.body);

    return res.json(meetupUpdated);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You are not owner this meetup' });
    }

    const hourStart = startOfHour(parseISO(meetup.date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    const meetupDeleted = await meetup.destroy();
    return res.json(meetupDeleted);
  }
}

export default new MeetupController();
