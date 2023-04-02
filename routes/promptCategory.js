const router = require("express").Router();
const promptCategoryController = require("../controllers/promptCategoryController")
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/")
  .post(promptCategoryController.addPromptCategory)
  .get(promptCategoryController.getAllPromptCategories)

router.route("/:id")
  .get(promptCategoryController.getPromptCategoryById)
  .put(promptCategoryController.updatePromptCategory)
  .delete(promptCategoryController.deletePromptCategory)

module.exports = router;
