const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const imageUploader = require("../helper/imageUploader");

Router.post("/createuser", imageUploader.none(), userController.createUser);
Router.post("/loginuser", imageUploader.none(), userController.loginUser);

module.exports = Router;
