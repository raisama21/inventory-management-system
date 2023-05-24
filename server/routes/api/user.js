const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const registerController = require("../../controllers/registerController");
const authController = require("../../controllers/authController");

router.post("/register", registerController.handleRegistration);
router.post("/auth", authController.handleAuthentication);

router
  .route("/:id")
  .put(userController.updateUserInfo)
  .delete(userController.deleteUserInfo);

module.exports = router;
