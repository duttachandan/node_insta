require("dotenv").config();
const userSchema = require("../model/userSchema");
const userValidation = require("../utils/userValidator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const ExpressError = require("../utils/ExpressError");
const logger = require("../utils/Logger");

class userController {
  // all user list
  async getUser(req, res) {
    const allUser = await userSchema.find();
    res.json(allUser);
  }
  // user sign up
  async createUser(req, res) {
    const { email, password } = req.body;
    const generateHashPass = await bcrypt.hash(password, 10);
    const username = email?.split("@")[0];
    const userCredentials = {
      username: username,
      email: email,
      password: generateHashPass,
    };
    const validateUserCredentials = userValidation.validate(userCredentials);
    if (!validateUserCredentials)
      throw new ExpressError(404, "entered all the fields");
    const user = userSchema(userCredentials);
    const data = await user.save();
    logger.info(data);
    if (!data) throw new ExpressError(404, "error in the user creation");
    const payload = {
      sub: username,
      email: email,
    };
    const token = jsonwebtoken.sign(payload, SECRET_KEY, {
      expiresIn: "60m",
    });
    if (!token) throw ExpressError(404, "Invalid Token Error");
    res.json({
      username: username,
      email: email,
      token: token,
    });
  }
  // user sign in
  async loginUser(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    const userData = await userSchema.findOne({ email: email });
    console.log(userData);
    if (!userData) throw new ExpressError(404, "user credentials not found");
    const isPassMatch = await bcrypt.compare(password, userData.password);
    if (!isPassMatch) throw new ExpressError(401, "invalid password");
    const payload = {
      sub: userData.username,
      email: userData.email,
    };
    const generateToken = jsonwebtoken.sign(payload, SECRET_KEY, {
      expiresIn: "60m",
    });
    res.json({
      username: userData.username,
      email: userData.email,
      token: generateToken,
    });
  }
  // user soft Deletion
  async deleteAllUser(req, res) {
    const deleteAllUser = await userSchema.deleteMany({});
    console.log(deleteAllUser);
    res.status(200).json(deleteAllUser);
  }
}

module.exports = new userController();
