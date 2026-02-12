const jsonwebtoken = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const SECRET_KEY = process.env.SECRET_KEY;

const refreshToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) throw new ExpressError(404, "no token provided");
  next();
};

module.exports = refreshToken;
