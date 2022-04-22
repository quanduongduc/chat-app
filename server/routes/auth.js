require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const requiredAuth = require("../middlewares/auth").requiredAuth;

const cookieConfig = {
  secure: false, // true if Production env
  httpOnly: true,
  maxAge: 2592000000, // 30days
};

router.get("/", requiredAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    return res.send({
      success: true,
      message: "Authenticate Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(401).json({
      success: false,
      message: "userName or password is missing",
    });
  }
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "UserName not Found",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "userName or password is incorrect",
      });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.cookie("accessToken", accessToken, cookieConfig);

    return res.send({
      success: "true",
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { nickName, userName, password, confirmPassword } = req.body;
  if (!nickName || !userName || !password || !confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Something is missing, please try again",
    });
  }
  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Confirm Password is not matched",
    });
  }
  const isExisted = await User.exists({ userName });
  if (isExisted) {
    return res.status(401).json({
      success: false,
      message: "User Name is already taken",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    nickName,
    userName,
    password: hashPassword,
  });
  await user.save();
  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET_KEY
  );
  res.cookie("accessToken", accessToken, cookieConfig);
  return res.send({
    success: true,
    message: "Register Successfully",
  });
});

module.exports = router;
