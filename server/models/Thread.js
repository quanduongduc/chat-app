const mongoose = require("mongoose");
const { Schema } = mongoose;

const ThreadSchema = new Schema(
  {
    messages: {
      type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      validate: membersLimit,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

function membersLimit(members) {
  return members.length >= 2;
}

module.exports = mongoose.model("Thread", ThreadSchema);
