const router = require("express").Router();
const promptCategoryController = require("../controllers/promptCategoryController")
const verifyJWT = require('../middleware/verifyJWT')

/**
 * @swagger
 * components:
 *   schemas:
 *     PromptCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *       example:
 *         id: 1
 *         name: Category 1
 */

/**
 * @swagger
 * tags:
 *   name: Prompt Categories
 *   description: Prompt Categories API
 */

/**
 * @swagger
 * /api/promptCategories:
 *   post:
 *     summary: Add a prompt category
 *     description: Add a new prompt category
 *     tags: [Prompt Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromptCategory'
 *     responses:
 *       201:
 *         description: Prompt category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromptCategory'
 *       400:
 *         description: Name is required
 *   get:
 *     summary: Get all prompt categories
 *     description: Retrieve all prompt categories
 *     tags: [Prompt Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PromptCategory'
 */
router.route("/api/promptCategories")
  .post(verifyJWT, promptCategoryController.addPromptCategory)
  .get(verifyJWT, promptCategoryController.getAllPromptCategories)

/**
 * @swagger
 * /api/promptCategories/{id}:
 *   get:
 *     summary: Get a prompt category by ID
 *     description: Retrieve a prompt category by its ID
 *     tags: [Prompt Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt category
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromptCategory'
 *       404:
 *         description: Prompt category not found
 *   put:
 *     summary: Update a prompt category
 *     description: Update an existing prompt category
 *     tags: [Prompt Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromptCategory'
 *     responses:
 *       200:
 *         description: Prompt category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromptCategory'
 *       404:
 *         description: Prompt category not found
 *   delete:
 *     summary: Delete a prompt category
 *     description: Delete an existing prompt category
 *     tags: [Prompt Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the prompt category
 *     responses:
 *       200:
 *         description: Prompt category deleted successfully
 *       404:
 *         description: Prompt category not found
 */
router.route("/api/promptCategories/:id")
  .get(verifyJWT, promptCategoryController.getPromptCategoryById)
  .put(verifyJWT, promptCategoryController.updatePromptCategory)
  .delete(verifyJWT, promptCategoryController.deletePromptCategory)

module.exports = router;
