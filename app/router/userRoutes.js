const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const imageUploader = require("../helper/imageUploader");

Router.post("/createuser", imageUploader.none(), userController.createUser);
Router.post("/loginuser", imageUploader.none(), userController.loginUser);
Router.get("/user", userController.getUser);
Router.get("/deletealluser", userController.deleteAllUser);

module.exports = Router;
