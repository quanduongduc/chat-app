const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
const Thread = require("../models/Thread");
const { requiredAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", requiredAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const threads = await Thread.find({
      members: { $in: userId },
    })
      .limit(10)
      .lean()
      .select("_id updatedAt")
      .exec();
    if (!threads) {
      return res.status(404).json({
        success: false,
        message: "No threads Found",
      });
    }
    return res.send({
      success: true,
      message: "Get Threads successfully",
      threads,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// router.post("/:userId", requiredAuth, async (req, res) => {
//   try {
//     const { userId: senderId } = req.body;
//     const { userId: receiverId } = req.params;
//     const thread = new Thread({
//       members: [senderId, receiverId],
//     });
//     await thread.save();
//     return res.send({
//       success: true,
//       message: "New Thread was created",
//       thread,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

module.exports = router;
