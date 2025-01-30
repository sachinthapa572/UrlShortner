import { Router } from 'express';
import { redirect, stats } from '../controllers/index.js';

const router = Router();
// routes
router.get('/:urlId', redirect);
router.post('/stats', stats);

export default router;
