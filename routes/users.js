const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         pseudonym:
 *           type: string
 *         email:
 *           type: string
 *         city:
 *           type: string
 *         password:
 *           type: string
 *         country:
 *           type: string
 *         profileImage:
 *           type: string
 *       example:
 *         pseudonym: John Doe 01
 *         email: john.doe01@example.com
 *         password: "123456"
 *         city: "Lahore"
 *         country: "Pakistan"
 *         profileImage: "https://avatars.githubusercontent.com/u/61361037?s=400&u=5a3fe223b969f16e2a4523817eb3acf361935f74&v=4"
 * 
 *     Response:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         description:
 *           type: string
 *         userId:
 *           type: integer
 *         promptId:
 *           type: integer
 *       example:
 *         pseudonym: "raoakif08"
 *         email: "akifrao8@gmail.com"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a user
 *     description: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: All fields are required
 *       409:
 *         description: A user with this pseudonym or email already exists
 */
router.post("/", userController.registerUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", verifyJWT, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by its ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for Authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *        ...
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for Authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *        ...
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for Authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *        ...
 */

module.exports = router;
