const { requiredAuth } = require("../middlewares/auth");
const Message = require("../models/Message");
const Thread = require("../models/Thread");
const router = require("express").Router();
const multer = require("multer");
const cloudUpload = require("../helpers/CloudinaryUpload");
const upload = multer();

router.post(
  "/",
  requiredAuth,
  upload.array("attractments"),
  async (req, res) => {
    try {
      const files = req.files;
      const { userId: senderId, threadId, message: sendMessage } = req.body;
      console.log(req.body);
      cloudUpload(files);
      if (!sendMessage) {
        return res.status(422).json({
          success: false,
          message: "Message not found",
        });
      }
      const message = new Message({
        sender: senderId,
        thread: threadId,
        message: sendMessage,
      });
      await Thread.findOneAndUpdate(
        { _id: threadId },
        {
          $push: {
            messages: message,
          },
        }
      );
      await message.save();
      return res.send({
        success: true,
        message: "Send message Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Intenal Server Error",
      });
    }
  }
);

router.get("/:threadId", async (req, res) => {
  try {
    const { threadId } = req.params;
    const messages = await Message.find({
      thread: threadId,
    })
      .lean()
      .populate("sender", "nickName")
      .exec();
    if (!messages) {
      return res.status(404).json({
        success: false,
        message: "Messages Not Found",
      });
    }
    return res.send({
      success: true,
      message: "Messages ready",
      messages,
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
