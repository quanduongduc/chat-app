const mongoose = require("mongoose");
const User = require("../models/User");
const router = require("express").Router();

router.get("/:userId", (req, res) => {
  console.log(req.params);
});

router.patch("/:userId", (req, res) => {
  console.log(req.parems.id);
});

router.post("/", async (req, res) => {
  try {
    const { nickName } = req.body;
    const users = await User.aggregate([
      {
        $search: {
          index: "NickNameIndex",
          autocomplete: {
            query: nickName,
            path: "nickName",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          nickName: 1,
          avatarPath: 1,
        },
      },
    ]);
    console.log(users);

    return res.send({
      success: true,
      message: "Fetch user successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
