import Sequelize from 'sequelize';

import User from '../app/models/User';

import dataBaseConfig from '../config/database';

const models = [User]; // Array com todos os models

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
