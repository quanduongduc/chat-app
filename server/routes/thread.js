const Thread = require("../models/Thread");
const { requiredAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", requiredAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const threads = await Thread.find({
      members: { $in: userId },
      messages: {
        $exists: true,
        $not: { $size: 0 },
      },
    })
      .limit(10)
      .lean()
      .select("_id updatedAt members")
      .populate({
        path: "members",
        match: {
          _id: {
            $ne: userId,
          },
        },
      })
      .exec();
    console.log(threads);
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

router.post("/:userId", requiredAuth, async (req, res) => {
  try {
    const { userId: senderId } = req.body;
    const { userId: receiverId } = req.params;
    const thread = await Thread.findOne({
      members: {
        $size: 2,
        $all: [senderId, receiverId],
      },
    })
      .lean()
      .select("_id updatedAt memebers")
      .populate({
        path: "members",
        match: {
          _id: {
            $ne: senderId,
          },
        },
      })
      .exec();
    if (thread) {
      return res.send({
        success: true,
        message: "Get Thread Successfully",
        thread,
      });
    } else {
      const thread = new Thread({
        members: [senderId, receiverId],
      });
      console.log(thread);
      await thread.save();
      thread
        .select("_id updatedAt memebers")
        .populate({
          path: "members",
          match: {
            _id: {
              $ne: senderId,
            },
          },
        })
        .exec();
      await Thread.populate(thread, {
        path: "members",
        match: {
          _id: {
            $ne: senderId,
          },
        },
      });
      console.log("populate", thread);

      return res.send({
        success: true,
        message: "New Thread was created",
        thread,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
