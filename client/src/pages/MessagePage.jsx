import SocketProvider from "../context/SocketContext";
import Messenger from "../components/messenger/Messenger";

function MessagePage() {
  return (
    <SocketProvider>
      <Messenger></Messenger>
    </SocketProvider>
  );
}

export default MessagePage;
