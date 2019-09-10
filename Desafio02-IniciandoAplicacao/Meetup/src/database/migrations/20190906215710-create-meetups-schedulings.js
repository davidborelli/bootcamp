module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups_schedulings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'meetups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('meetups_schedulings');
  },
};
