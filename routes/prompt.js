const router = require("express").Router();
const promptController = require("../controllers/promptController");
const verifyJWT = require("../middleware/verifyJWT");

/**
 * @swagger
 * components:
 *   schemas:
 *     Prompt:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         description:
 *           type: string
 *         promptCategoryId:
 *           type: integer
 *         userId:
 *           type: integer
 *       example:
 *         id: 1
 *         description: Prompt "1"
 *         promptCategoryId: "1"
 *         userId: "1"
 */

/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: Prompts API
 */

/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Add a prompt
 *     description: Add a new prompt
 *     tags: [Prompts]
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
 *             $ref: '#/components/schemas/Prompt'
 *     responses:
 *       200:
 *         description: Prompt added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: A prompt with the same description already exists
 *   get:
 *     summary: Get all prompts
 *     description: Retrieve all prompts
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/Prompt'
 */
router.route("/").post(verifyJWT, promptController.addPrompt).get(verifyJWT, promptController.getAllPrompts);

/**
 * @swagger
 * /api/prompts/{id}:
 *   get:
 *     summary: Get a prompt by ID
 *     description: Retrieve a prompt by its ID
 *     tags: [Prompts]
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
 *         description: ID of the prompt
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       404:
 *         description: Prompt not found
 *   put:
 *     summary: Update a prompt
 *     description: Update an existing prompt
 *     tags: [Prompts]
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
 *         description: ID of the prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prompt'
 *     responses:
 *       200:
 *         description: Prompt updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: A prompt with the same description already exists
 *       404:
 *         description: Prompt not found
 *   delete:
 *     summary: Delete a prompt
 *     description: Delete an existing prompt
 *     tags: [Prompts]
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
 *         description: ID of the prompt
 *     responses:
 *       200:
 *         description: Prompt deleted successfully
 *       404:
 *         description: Prompt not found
 */
router
  .route("/:id")
  .get(verifyJWT, promptController.getPromptById)
  .put(verifyJWT, promptController.updatePrompt)
  .delete(verifyJWT, promptController.deletePrompt);

router.route("/byresponse/:id").get(verifyJWT, promptController.getPromptsByResponseId);

module.exports = router;
