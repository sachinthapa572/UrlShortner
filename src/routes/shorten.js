import { Router } from 'express';
import { shortenGuest, shortenUser } from '../controllers/shorten.js';
import { requireSignin } from '../controllers/auth.js';

const srouter = Router();

/**
 * @swagger
 * /shorten-guest:
 *   post:
 *     summary: Shorten a URL as a guest user
 *     tags: [Shorten]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mainUrl:
 *                 type: string
 *                 example: https://example.com
 *     responses:
 *       200:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   example: https://example.com
 *                 shortUrl:
 *                   type: string
 *                   example: http://localhost:3001/abc123
 *                 urlId:
 *                   type: string
 *                   example: abc123
 *                 status:
 *                   type: string
 *                   example: public
 *                 date:
 *                   type: string
 *                   example: 2021-06-14T07:00:00.000Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: The URL field is required
 *       500:
 *         description: Server error
 */
srouter.post('/shorten-guest', shortenGuest);

/**
 * @swagger
 * /shorten-user:
 *   post:
 *     summary: Shorten a URL as a registered user
 *     tags: [Shorten]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mainUrl:
 *                 type: string
 *                 example: https://example.com
 *               userId:
 *                 type: string
 *                 example: 60c72b2f9b1d8e001c8e4b8a
 *     responses:
 *       200:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: object
 *                   properties:
 *                     originalUrl:
 *                       type: string
 *                       example: https://example.com
 *                     shortUrl:
 *                       type: string
 *                       example: http://localhost:3001/abc123
 *                     urlId:
 *                       type: string
 *                       example: abc123
 *                     status:
 *                       type: string
 *                       example: private
 *                     date:
 *                       type: string
 *                       example: 2021-06-14T07:00:00.000Z
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8e4b8a
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     urls:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 60c72b2f9b1d8e001c8e4b8a
 *                     last_shortened:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8e4b8a
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: URL field is Empty
 *       500:
 *         description: Server error
 */
srouter.post('/shorten-user', requireSignin, shortenUser);

export default srouter;
