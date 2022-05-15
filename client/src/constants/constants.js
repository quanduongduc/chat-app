export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/v1"
    : "https://chat-app-server-051102.herokuapp.com/api/v1";
export const socketURL =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:5000/api/v1"
    : "ws://chat-app-server-051102.herokuapp.com";
