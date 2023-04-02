const router = require("express").Router();
const responseController = require("../controllers/responseController")
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/")
  .post(responseController.addResponse)
  .get(responseController.getAllResponses)

router.route("/:id")
  .get(responseController.getResponseById)
  .put(responseController.updateResponse)
  .delete(responseController.deleteResponse)

module.exports = router;
