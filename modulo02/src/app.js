import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Teching read request body format json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')) // Define URL static source to access
    );
  }

  routes() {
    this.server.use(routes); // As the routes are middleware, we can pass as a parameter
  }
}

export default new App().server;
