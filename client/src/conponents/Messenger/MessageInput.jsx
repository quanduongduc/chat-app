import { useState, useContext, useRef } from 'react';
import { SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { apiURL } from '../../constants/constants';

function MessageInput({ threadId }) {
    const ws = useContext(SocketContext).socket;
    const { user } = useContext(AuthContext).authState;
    const attractmentRef = useRef();

    const [message, setMessage] = useState("");
    const [attractments, setAttractments] = useState([]);

    const messageUpload = async () => {
        let data = null;
        if (attractments) {
            const formData = new FormData();
            formData.append("sender", user._id)
            formData.append("threadId", threadId)
            formData.append("text", message)
            attractments.forEach((attractment) => {
                formData.append("attractments", attractment)

            })
            data = formData
        } else {
            data = {
                sender: user._id,
                threadId: threadId,
                text: message,
            }
        }
        const res = await axios.post(`${apiURL}/message`,
            data
            , {
                headers: { 'content-type': 'multipart/form-data' },
                withCredentials: true
            })

        if (res) {
            const { attachments } = res.data;
            console.log("attachments " + attachments);
            ws.send(JSON.stringify({
                event: "clientMessage",
                message: {
                    text: message,
                    sender: user._id,
                    threadId: threadId,
                    attachments,
                }
            }))
        }
        if (res.data.success) {
            console.log("message send successfully");
        }
    }

    const submitMessage = async (e) => {
        e.preventDefault();

        try {
            messageUpload();
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
            console.log(error);
        }
        attractmentRef.current.value = "";
        setMessage("");
        setAttractments([]);
    }

    const messageOnchange = (e) => {
        ws.send(JSON.stringify({
            event: "clientTyping",
            sender: user.nickName,
            typing: true,
            threadId: threadId
        }))
        setMessage(e.target.value)
    }

    const attachmentOnchange = (e) => {
        setAttractments([...attractments, ...e.target.files]);
        attractmentRef.current.value = "";
    }

    return (
        <>
            <form onSubmit={submitMessage}>
                <input type="text" value={message} onChange={messageOnchange} />
                <input ref={attractmentRef} type="file" id='attachment' multiple onChange={attachmentOnchange} />
                <button>Send</button>
            </form>
            {
                attractments.map((image, index) => {
                    const url = URL.createObjectURL(image)
                    return (
                        <img style={{ width: "300px" }}
                            key={index}
                            src={url}
                            alt="preview" />
                    )
                })
            }
        </>
    )
}

export default MessageInput;