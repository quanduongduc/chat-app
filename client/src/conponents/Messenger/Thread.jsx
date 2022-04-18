import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../../constants/constants";
import Message from "./Message";

function Thread({ threadId, socketMessage }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (socketMessage) {
            setMessages([...messages, socketMessage]);
        }
    }, [socketMessage])

    async function getMessages() {
        try {
            const response = await axios.get(`${apiURL}/message/${threadId}`)
            if (response.data.success) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }

    useEffect(() => {
        getMessages();
    }, [threadId])

    return (
        <>
            <h2>{threadId}</h2>
            {
                messages.map((message, index) => {
                    return <Message key={index} message={
                        `${message.sender.nickName} : ${message.message}`
                    } />
                })
            }
        </>
    )
}

export default Thread;