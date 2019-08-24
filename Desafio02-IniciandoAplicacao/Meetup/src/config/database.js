module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'meetup',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
