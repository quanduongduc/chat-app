const Thread = require("../models/Thread");
const User = require("../models/User");
let clients = [];

const handleClientMessage = async (wss, data) => {
  try {
    if (data.message) {
      const threadQuery = Thread.findById(data.threadId)
        .select("members _id")
        .exec();
      const nickNameQuery = User.findById(data.sender)
        .select("nickName")
        .exec();
      const [{ members, _id }, { nickName }] = await Promise.all([
        threadQuery,
        nickNameQuery,
      ]);
      wss.clients.forEach((client) => {
        if (members.includes(client.id)) {
          console.log("send");
          client.send(
            JSON.stringify({
              event: "returnMessage",
              sender: { nickName },
              message: data.message,
              threadId: _id,
            })
          );
        }
      });
    }
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
    console.log("clients : " + wss.clients.size);

    ws.on("close", () => {
      console.log(ws.id);
      clients = clients.filter((client) => client != ws.id);
      console.log(clients);
      console.log("a client disconect");
    });

    ws.on("message", (data) => {
      try {
        console.log(data.toString("utf8"));
        data = JSON.parse(data);
        console.log(data);
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
