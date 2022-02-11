const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();

router.route("/").get(viewController.getIndex);
router.route("/about").get(viewController.getAbout);
router.route("/register").get(viewController.getRegister);
router.route("/login").get(viewController.getLogin);

module.exports = router;
