const jwt = require("jsonwebtoken");
const NotAuthorized = require("../utils/notAuthorizedResponse");
const { User } = require("../models/user");
const config = require("config");

exports.postCheckLogin = async (req, res) => {
  const token = req.header("X-OBSERVATORY-AUTH");
  if (!token) return NotAuthorized(res, error);

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const userId = decoded;

    const user = await User.findOne({ username: userId.username });
    if (!user) return NotAuthorized(res);

    res.sendStatus(200);
  } catch (error) {
    return NotAuthorized(res, error);
  }
};
