require("dotenv").config();
const userSchema = require("../model/userSchema");
const userValidation = require("../helper/userValidator");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const logger = require("../utils/Logger");
const ExpressError = require("../utils/ExpressError");

class userController {
  async createUser(req, res) {
    console.log(req.body);
    const { username, email, password } = req.body;
    const payload = {
      sub: email,
      role: password,
    };
    const tokenGeneration = jsonwebtoken.sign(payload, SECRET_KEY, {
      expiresIn: "15m",
    });
    const user = userSchema({
      username: username,
      email: email,
      token: tokenGeneration,
    });
    const data = await user.save();
    if (!data) throw new ExpressError(404, "error in the user creation");
    res.status(200).json(data);
  }
  async loginUser(req, res) {
    const { email, password } = req.body;
    console.log(email);
    const userData = await userSchema.find({ email: email });
    if (!userData) throw new ExpressError(404, "user credentials not found");
    console.log(userData);
    const payload = {
      sub: email,
      role: password,
    };

    const decode = jsonwebtoken.verify(token, SECRET_KEY);
  }
}

module.exports = new userController();
