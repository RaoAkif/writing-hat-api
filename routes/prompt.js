const router = require("express").Router();
const promptController = require("../controllers/promptController")
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/")
  .post(promptController.addPrompt)
  .get(promptController.getAllPrompts)

router.route("/:id")
  .get(promptController.getPromptById)
  .put(promptController.updatePrompt)
  .delete(promptController.deletePrompt)

module.exports = router;
