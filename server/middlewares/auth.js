require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requiredAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    console.log(accessToken);
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "AccessToken Not Found",
      });
    }
    const verify = jwt.verify(accessToken, process.env.SECRET_KEY);
    const isExistedUser = await User.countDocuments({
      _id: verify.userId,
    });
    if (!isExistedUser) {
      res.clearCookie("accessToken");
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    req.body.userId = verify.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  requiredAuth,
};
