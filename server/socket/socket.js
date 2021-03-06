const Thread = require("../models/Thread");
const User = require("../models/User");
let clients = [];

const handleClientMessage = async (wss, data) => {
  try {
    const { threadId, sender, attachments, text } = data.message;
    const threadQuery = Thread.findById(threadId)
      .select("members _id")
      .lean()
      .populate("members")
      .exec();
    const nickNameQuery = User.findById(sender)
      .lean()
      .select("nickName avatarPath")
      .exec();
    const [thread, { nickName, avatarPath }] = await Promise.all([
      threadQuery,
      nickNameQuery,
    ]);
    wss.clients.forEach((client) => {
      if (
        thread.members.find((member) => member._id.toString() === client.id) &&
        client.id != sender
      ) {
        client.send(
          JSON.stringify({
            event: "returnMessage",
            message: {
              sender: {
                _id: sender,
                nickName,
                avatarPath,
              },
              text,
              attachments,
              thread: thread,
              createdAt: new Date(Date.now()).toISOString(),
            },
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const handleClientTyping = async (wss, data) => {
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        event: "returnTyping",
        sender: data.nickName,
        message: `${data.sender} is typing`,
      })
    );
  });
};

const handleClientSign = (ws, data) => {
  ws.id = data.userId;
  console.log("a client sign");
  clients.push(data.userId);
  console.log(clients);
};

const sockets = (wss) => {
  wss.on("connection", (ws) => {
    console.log("a Client Connected");

    ws.on("close", () => {
      clients = clients.filter((client) => client != ws.id);
      console.log(clients);
      console.log("a client disconect");
    });

    ws.on("message", (data) => {
      try {
        data = JSON.parse(data);
        switch (data.event) {
          case "sign":
            handleClientSign(ws, data);
            break;
          case "clientMessage":
            handleClientMessage(wss, data);
            break;
          case "clientTyping":
            handleClientTyping(wss, data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

module.exports = sockets;
