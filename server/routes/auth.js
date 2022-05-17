require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const fs = require("fs");
const multer = require("multer");
const cloudUpload = require("../helpers/CloudinaryUpload");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./static/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const requiredAuth = require("../middlewares/auth").requiredAuth;

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

    return res.send({
      success: "true",
      message: "Login Successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", upload.single("avatar"), async (req, res) => {
  try {
    const { nickName, userName, password, confirmPassword } = req.body;
    const avatar = req.file;
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

    if (avatar) {
      const [{ secure_url }] = await cloudUpload([avatar]);
      fs.unlink(avatar.path, () => {});
      avatar.url = secure_url;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nickName,
      userName,
      password: hashPassword,
      avatarPath: avatar && avatar.url,
    });
    await user.save();
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY
    );
    return res.send({
      success: true,
      message: "Register Successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.send({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
