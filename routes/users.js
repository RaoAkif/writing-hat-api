const router = require("express").Router();
const userController = require("../controllers/userController")
const verifyJWT = require('../middleware/verifyJWT')

router.route("/")
.post(userController.registerUser)

router.use(verifyJWT)

router.route("/")
  .post(userController.registerUser)
  .get(userController.getAllUsers)

router.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;
