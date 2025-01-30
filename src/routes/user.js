import { Router } from "express";
import { editUrl, getUser, getUserUrls } from "../controllers/user.js";
import { requireSignin } from "../controllers/auth.js";

const urouter = Router();

//controllers

//routes

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1d8e001c8e4b8a
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 60c72b2f9b1d8e001c8e4b8a
 *                 last_shortened:
 *                   type: string
 *                   example: 60c72b2f9b1d8e001c8e4b8a
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Unauthorized
 */
urouter.get("/user/:userId", requireSignin, getUser);

/**
 * @swagger
 * /urls/{userId}:
 *   get:
 *     summary: Get URLs for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: URLs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       originalUrl:
 *                         type: string
 *                         example: https://example.com
 *                       shortUrl:
 *                         type: string
 *                         example: http://localhost:3001/abc123
 *                       urlId:
 *                         type: string
 *                         example: abc123
 *                       status:
 *                         type: string
 *                         example: private
 *                       date:
 *                         type: string
 *                         example: 2021-06-14T07:00:00.000Z
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Server error
 */
urouter.get("/urls/:userId", requireSignin, getUserUrls);

/**
 * @swagger
 * /edit-url:
 *   post:
 *     summary: Edit a shortened URL
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urlId:
 *                 type: string
 *                 example: abc123
 *               newUrlId:
 *                 type: string
 *                 example: xyz789
 *               userId:
 *                 type: string
 *                 example: 60c72b2f9b1d8e001c8e4b8a
 *     responses:
 *       200:
 *         description: URL edited successfully
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
 *                       example: http://localhost:3001/xyz789
 *                     urlId:
 *                       type: string
 *                       example: xyz789
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       500:
 *         description: Server error
 */
urouter.post("/edit-url", requireSignin, editUrl);

export default urouter;
