const express = require("express");
const viewController = require("./../controllers/viewController");
const redirectMiddleware = require("./../middlewares/redirectMiddleware");

const router = express.Router();

router.route("/").get(viewController.getIndex);
router.route("/about").get(viewController.getAbout);
router.route("/register").get(redirectMiddleware, viewController.getRegister);
router.route("/login").get(redirectMiddleware, viewController.getLogin);

module.exports = router;
