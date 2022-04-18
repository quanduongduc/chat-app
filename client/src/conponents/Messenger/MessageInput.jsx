import { useState, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { apiURL } from '../../constants/constants';

function MessageInput({ threadId }) {
    const ws = useContext(SocketContext).socket;
    const { user } = useContext(AuthContext).authState;

    const [message, setMessage] = useState("");
    const [attractments, setAttractments] = useState([]);

    const messageUpload = async () => {
        let data = null;
        if (attractments) {
            const formData = new FormData();
            formData.append("sender", user._id)
            formData.append("threadId", threadId)
            formData.append("message", message)
            formData.append("sender", user._id)
            attractments.forEach((attractment) => {
                formData.append("attractments", attractment)

            })
            data = formData
        } else {
            data = {
                sender: user._id,
                threadId: threadId,
                message: message,
            }
        }
        const res = await axios.post(`${apiURL}/message`,
            data
            , {
                headers: { 'content-type': 'multipart/form-data' },
                withCredentials: true
            })
        ws.send(JSON.stringify({
            event: "clientMessage",
            message: message,
            sender: user._id,
            threadId: threadId,
            attractments: res.data.attractments,
        }))
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
        setMessage("");
    }

    console.log(attractments[0]);

    const messageOnchange = (e) => {
        ws.send(JSON.stringify({
            event: "clientTyping",
            sender: user.nickName,
            typing: true,
            threadId: threadId
        }))
        setMessage(e.target.value)
    }

    const imagesOnchange = (e) => {
        setAttractments([...attractments, e.target.files[0]]);
    }

    return (
        <>
            <form onSubmit={submitMessage}>
                <input type="text" value={message} onChange={messageOnchange} />
                <input type="file" id='image' accept='image/png, image/jpeg' onChange={imagesOnchange} />
                <button>Send</button>
            </form>
            {
                attractments.map((image, index) => {
                    const url = URL.createObjectURL(image)
                    return <img style={
                        {
                            width: "300px"
                        }
                    } key={index
                    } src={url
                    } alt="preview" />
                })
            }
        </>
    )
}

export default MessageInput;