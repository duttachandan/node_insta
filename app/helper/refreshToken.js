const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    throw new ExpressError(500, "token is require for authentication");
  const decode = await jwt.verify(token, SECRET_KEY);
  if (!decode) throw new ExpressError(500, "invalid token access");
  req.user = decode;
  next();
};

module.exports = verifyToken;
