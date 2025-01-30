import { Router } from 'express';
import { login, register } from '../controllers/auth.js';

const authrouter = Router();
//routes
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
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
 *                     createdAt:
 *                       type: string
 *                       example: 2021-06-14T07:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2021-06-14T07:00:00.000Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Email already exists
 */
authrouter.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8e4b8a
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     urls:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 60c72b2f9b1d8e001c8e4b8a
 *                     role:
 *                       type: string
 *                       example: user
 *                     createdAt:
 *                       type: string
 *                       example: 2021-06-14T07:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2021-06-14T07:00:00.000Z
 *                     last_shortened:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8e4b8a
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: userModel with that email does not exist
 */
authrouter.post('/login', login);

export default authrouter;
