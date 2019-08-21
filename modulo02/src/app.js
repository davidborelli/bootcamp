import express from "express";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Teching read request body format json
  }

  routes() {
    this.server.use(routes); // As the routes are middleware, we can pass as a parameter
  }
}

export default new App().server;
