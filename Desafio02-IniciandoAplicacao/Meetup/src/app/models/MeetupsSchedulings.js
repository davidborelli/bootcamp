import Sequelize, { Model } from 'sequelize';

class MeetupsSchedulings extends Model {
  static init(sequelize) {
    super.init(
      {
        meetup_id: Sequelize.NUMBER,
        user_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetup' });
  }
}

export default MeetupsSchedulings;
