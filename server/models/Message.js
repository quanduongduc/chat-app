const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
    message: {
      type: String,
    },
    attractments: {
      type: [Schema.Types.ObjectId],
      ref: "Attractment",
      default: [],
    },
    senderVisibility: {
      type: Boolean,
      default: true,
    },
    receiverVisibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
