require("dotenv").config();
const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chat-app.v8d7n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
};
