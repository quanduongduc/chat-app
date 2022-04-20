const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttractmentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["image", "video", "raw"],
  },
});

module.exports = mongoose.model("Attachment", AttractmentSchema);
