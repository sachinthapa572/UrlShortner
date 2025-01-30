import { Router } from 'express';
import authrouter from './auth.js';
import srouter from './shorten.js';
import urouter from './user.js';
import router from './index.js';

const routes = Router();

routes.use('/', authrouter);
routes.use('/', srouter);
routes.use('/', urouter);
routes.use('/', router);

export default routes;
