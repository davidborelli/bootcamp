import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewate from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* very important where this is stated because
   execution is procedural, token settings are only valid under it.  */
routes.use(authMiddlewate);

routes.post('/users', UserController.update);
routes.post('/files', upload.single('file'), (req, res) => {
  // file is the name of the field that will be sent in the request
  return res.json({ message: 'ok' });
});

export default routes;
