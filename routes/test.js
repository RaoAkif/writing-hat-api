const router = require("express").Router();
const testController = require("../controllers/testController");

router.route("/").get(testController.runTest);

module.exports = router;
