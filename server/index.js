require("dotenv").config();

const express = require("express");
const http = require("http");
const ws = require("ws");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const wss = new ws.WebSocketServer({ server });
const sockets = require("./socket/socket");
const port = process.env.PORT || 5000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const threadRoute = require("./routes/thread");
const messageRoute = require("./routes/message");

const db = require("./db");
db.connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://clinquant-profiterole-18fa11.netlify.app",
      "https://main--clinquant-profiterole-18fa11.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/user", userRoute);

app.use("/api/v1/thread", threadRoute);

app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

sockets(wss);
