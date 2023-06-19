const router = require("express").Router();
const responseController = require("../controllers/responseController");
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * components:
 *   schemas:
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
 *         id: 1
 *         description: Response 1
 *         userId: 1
 *         promptId: 1
 */

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Responses API
 */

/**
 * @swagger
 * /api/responses:
 *   post:
 *     summary: Add a response
 *     description: Add a new response
 *     tags: [Responses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: Response added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *   get:
 *     summary: Get all responses
 *     description: Retrieve all responses
 *     tags: [Responses]
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
 *                 $ref: '#/components/schemas/Response'
 */
router.route("/")
  .post(verifyJWT, responseController.addResponse)
  .get(verifyJWT, responseController.getAllResponses);

/**
 * @swagger
 * /api/responses/{id}:
 *   get:
 *     summary: Get a response by ID
 *     description: Retrieve a response by its ID
 *     tags: [Responses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the response
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         description: Response not found
 *   put:
 *     summary: Update a response
 *     description: Update an existing response
 *     tags: [Responses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: Response updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       400:
 *         description: Description, userId, and promptId are required
 *       404:
 *         description: Response not found
 *   delete:
 *     summary: Delete a response
 *     description: Delete an existing response
 *     tags: [Responses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the response
 *     responses:
 *       200:
 *         description: Response deleted successfully
 *       404:
 *         description: Response not found
 */
router.route("/:id")
  .get(verifyJWT, responseController.getResponseById)
  .put(verifyJWT, responseController.updateResponse)
  .delete(verifyJWT, responseController.deleteResponse);

module.exports = router;
