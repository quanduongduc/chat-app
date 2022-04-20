const Thread = require("../models/Thread");
const User = require("../models/User");
let clients = [];

const handleClientMessage = async (wss, data) => {
  try {
    console.log(data);
    const { threadId, sender, attachments, text } = data.message;
    console.log("Attachments " + attachments);
    const threadQuery = Thread.findById(threadId).select("members _id").exec();
    const nickNameQuery = User.findById(sender).select("nickName").exec();
    const [{ members, _id }, { nickName }] = await Promise.all([
      threadQuery,
      nickNameQuery,
    ]);
    wss.clients.forEach((client) => {
      if (members.includes(client.id)) {
        client.send(
          JSON.stringify({
            event: "returnMessage",
            message: {
              sender: { nickName },
              text,
              attachments,
              threadId: _id,
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
