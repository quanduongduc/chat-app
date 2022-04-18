import SocketProvider from "../context/SocketContext";
import Messenger from "../conponents/Messenger/Messenger";

function MessagePage() {
  return (
    <SocketProvider>
      <Messenger></Messenger>
    </SocketProvider>
  );
}

export default MessagePage;
