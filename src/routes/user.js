import { Router } from 'express';
import { editUrl, getUser, getUserUrls } from '../controllers/user.js';
import { requireSignin } from '../controllers/auth.js';

const urouter = Router();

//controllers

//routes
urouter.get('/user/:userId', requireSignin, getUser);
urouter.get('/urls/:userId', requireSignin, getUserUrls);
urouter.post('/edit-url', requireSignin, editUrl);

export default urouter;
