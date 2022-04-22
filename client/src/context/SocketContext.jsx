import { createContext, useContext } from "react";
import { socketURL } from "../constants/constants";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

function SocketProvider({ children }) {
  const authState = useContext(AuthContext).authState;
  const { user } = authState;

  const socket = new WebSocket(socketURL);

  socket.onopen = () => {
    if (user) {
      socket.send(JSON.stringify({
        event: "sign",
        userId: user._id,
      }))
    }
  };

  socket.onclose = () => {
    console.log("close socket");
  }

  const SocketContextData = {
    socket,
  };

  return (
    <SocketContext.Provider value={SocketContextData}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
