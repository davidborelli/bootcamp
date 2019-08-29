import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    // declaring get method, and exporting it
    return 'CancellationMail';
  }

  async handle({ data }) {
    // Task that will be performed when calling this method
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
