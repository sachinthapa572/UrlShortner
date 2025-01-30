import { Router } from 'express';
import { shortenGuest, shortenUser } from '../controllers/shorten.js';
import { requireSignin } from '../controllers/auth.js';

const srouter = Router();

// routes
srouter.post('/shorten-guest', shortenGuest);
srouter.post('/shorten-user', requireSignin, shortenUser);


export default srouter;
