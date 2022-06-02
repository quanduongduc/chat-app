const User = require("../models/User");
const router = require("express").Router();

router.get("/search/:nickName", async (req, res) => {
  try {
    const { nickName } = req.params;
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

router.get("/random", async (req, res) => {
  try {
    console.log(req);
    const users = await User.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    return res.send({
      success: true,
      message: "get random user succesfull",
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
