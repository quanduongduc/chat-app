import Messenger from "../components/messenger/Messenger";
import SocketProvider from "../context/SocketContext";

function MessagePage() {
  return (
    <SocketProvider>
      <Messenger></Messenger>
    </SocketProvider>
  );
}

export default MessagePage;
