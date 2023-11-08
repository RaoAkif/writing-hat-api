const router = require("express").Router();
const seedController = require("../controllers/seedController");

router.route("/prompt").get(seedController.seedPrompt);
router.route("/users").get(seedController.seedUsers);
router.route("/response").get(seedController.seedResponse);
router.route("/clear").get(seedController.clearData);
router.route("/test").get(seedController.test);

module.exports = router;
