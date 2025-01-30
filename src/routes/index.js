import { Router } from "express";
import { redirect, stats } from "../controllers/index.js";

const router = Router();
// routes

/**
 * @swagger
 * /:urlId:
 *   get:
 *     summary: Redirect to the original URL
 *     tags: [Redirect]
 *     parameters:
 *       - in: path
 *         name: urlId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the shortened URL
 *     responses:
 *       307:
 *         description: Redirect to the original URL
 *       404:
 *         description: URL not found
 */
router.get("/:urlId", redirect);

/**
 * @swagger
 * /stats:
 *   post:
 *     summary: Get statistics about URLs and users
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: integer
 *                   example: 100
 *                 users:
 *                   type: integer
 *                   example: 50
 *       500:
 *         description: Server error
 */
router.post("/stats", stats);

export default router;
