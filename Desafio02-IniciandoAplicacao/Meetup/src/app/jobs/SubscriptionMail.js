import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    // declaring get method, and exporting it
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    // Task that will be performed when calling this method
    const { subscription } = data;
    await Mail.sendMail({
      to: `${subscription.Meetup.User.name} <${subscription.Meetup.User.email}>`,
      subject: 'Nova inscrição',
      template: 'subscription',
      context: {
        user: subscription.Meetup.User.name,
        meetupName: subscription.Meetup.title,
        userName: subscription.User.name,
      },
    });
  }
}

export default new SubscriptionMail();
