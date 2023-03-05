const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const tokenValidation = require("../middleware/tokenValidation");

const userSchema = require("../apiSchema/userSchema");

router.post(
  "/signup",
  joiSchemaValidation.validateBody(userSchema.singup),
  userController.singup
);

router.post(
  "/login",
  joiSchemaValidation.validateBody(userSchema.login),
  userController.login
);

router.get(
  "/users",
  tokenValidation.validateAdminToken,
  userController.getAllUsers
);

router.get("/:id", userController.getUser);

router.put("/:id", tokenValidation.validateToken, userController.updateuser);

router.get("/", tokenValidation.validateAdminToken, userController.getAllUser);

module.exports = router;
