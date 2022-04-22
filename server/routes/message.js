const { requiredAuth } = require("../middlewares/auth");
const fs = require("fs");
const Message = require("../models/Message");
const Thread = require("../models/Thread");
const router = require("express").Router();
const Attractment = require("../models/Attractment");
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

router.post(
  "/",
  upload.array("attractments"),
  requiredAuth,
  async (req, res) => {
    try {
      const { userId: senderId, threadId, text } = req.body;
      const files = req.files;
      let attachments = [];
      let attachmentIds = [];

      if (!text && !files.length) {
        return res.status(422).json({
          success: false,
          message: "Message not found",
        });
      }
      if (files.length) {
        const res = await cloudUpload(files);
        console.log(files);
        files.forEach((file) => {
          fs.unlink(file.path, () => {});
        });
        attachments = res.map((attachment) => {
          return {
            author: senderId,
            name: attachment.public_id,
            path: attachment.url,
            type: attachment.resource_type,
          };
        });
        const dbAttachment = await Attractment.collection.insertMany(
          attachments
        );
        attachmentIds = Object.values(dbAttachment.insertedIds);
      }
      const message = new Message({
        sender: senderId,
        thread: threadId,
        text: text,
        attachments: attachmentIds,
      });
      await message.save();
      await Thread.findOneAndUpdate(
        { _id: threadId },
        {
          $push: {
            messages: message,
          },
        }
      );
      return res.send({
        success: true,
        message: "Send message Successfully",
        attachments,
      });
    } catch (error) {
      console.log(error);
      // cloudinary file's maximum size error
      if (error.name) {
        console.log("checked");
        return res.status(400).json({
          success: false,
          message: error,
        });
      }
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
      .populate("attachments")
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
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
