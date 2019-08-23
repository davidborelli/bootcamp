import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewate from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* very important where this is stated because
   execution is procedural, token settings are only valid under it.  */
routes.use(authMiddlewate);

routes.post('/users', UserController.update);

export default routes;
