import { differenceInHours, format } from 'date-fns';
import { Op } from 'sequelize';
import pt from 'date-fns/locale';
import Meetup from '../models/Meetup';
import MeetupsSchedulings from '../models/MeetupsSchedulings';
import User from '../models/User';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class MeetupsSchedulingController {
  async index(req, res) {
    const meetupsSchedulingsList = await MeetupsSchedulings.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(meetupsSchedulingsList);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });

    if (!meetup) {
      return res.status(404).json({ error: 'Informed Meetup does not exist' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You cannot sign up for your own meetup' });
    }

    // O usuário não pode se inscrever em meetups que já aconteceram.
    if (meetup.pass) {
      res.status(400).json({ error: 'Past date are not permited' });
    }

    const listSubscribedMeetup = await MeetupsSchedulings.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
    });

    let meetupSameTime = '';
    let meetupSignup = '';

    if (listSubscribedMeetup.length > 0) {
      listSubscribedMeetup.forEach(meetupLocated => {
        if (
          differenceInHours(meetupLocated.Meetup.date, meetup.date) === 0 &&
          meetupLocated.meetup_id !== meetup.id
        ) {
          const dateFormated = format(
            meetupLocated.meetup.date,
            'dd/MM/yyyy H:mm',
            {
              locale: pt,
            }
          );
          meetupSameTime = `Already subscribed to '${meetupLocated.meetup.title}' at ${dateFormated}`;
        }
        if (meetupLocated.meetup_id === meetup.id) {
          meetupSignup = `Already subscribed to this meetup`;
        }
      });
    }

    if (meetupSameTime !== '')
      return res.status(400).json({ error: meetupSameTime });
    if (meetupSignup !== '')
      return res.status(400).json({ error: meetupSignup });

    const scheduling = {
      meetup_id: req.params.meetupId,
      user_id: req.userId,
    };

    const { id } = await MeetupsSchedulings.create(scheduling);

    const subscription = await MeetupsSchedulings.findByPk(id, {
      include: [
        {
          model: Meetup,
          attributes: ['title'],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    await Queue.add(SubscriptionMail.key, {
      subscription,
    });

    return res.json(subscription);
  }
}

export default new MeetupsSchedulingController();
