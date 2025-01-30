import { Router } from 'express';
import { login, register } from '../controllers/auth.js';

const authrouter = Router();
//routes
authrouter.post('/register', register);
authrouter.post('/login', login);

export default authrouter;
