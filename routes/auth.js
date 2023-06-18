const router = require('express').Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         pseudonym:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         pseudonym: john_doe
 *         password: password123
 *     LoginResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         id:
 *           type: integer
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         id: 1
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: Logout successful
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login a user
 *     description: Login a user with provided credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post('/api/auth', loginLimiter, authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     description: Refresh the access token using the refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful token refresh
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshResponse'
 *       401:
 *         description: Unauthorized or invalid refresh token
 */
router.get('/api/auth/refresh', authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user and clear cookies
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 */
router.post('/api/auth/logout', authController.logout);

module.exports = router;
