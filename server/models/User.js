const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    nickName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarPath: {
      type: String,
      default:
        "https://res.cloudinary.com/quanduong/image/upload/v1651298952/default-avatar_oulphd.jpg",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined"],
      default: "Undefined",
    },
    friends: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
