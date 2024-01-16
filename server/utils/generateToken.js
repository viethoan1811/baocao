const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return jwt.sign({ ...id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};
const refreshToken = async (id) => {
  return jwt.sign({ ...id }, process.env.REFRESH_TOKEN_SECRET);
};
module.exports = { generateToken, refreshToken };