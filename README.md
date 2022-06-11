# Orange Chat
  ### A realtime Chat Application Build With Mern stack + WebSocket
  [Deployment](https://orangechat.netlify.app/)

## Message Sending Workflow
![Untitled Diagram drawio](https://user-images.githubusercontent.com/59951771/171674606-7786fb5b-3f93-462a-b2b8-0c2eaaa94e79.png)

  Here, Client send message to server. Then, server process this message (upload image,...) and return processed message to client. After receiving response, Client send message to websocket server and after that Websocket server send it to accurate users.
