import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { apiURL } from "../../constants/constants";
import Message from "./Message";
import { AuthContext } from "../../context/AuthContext";
function Thread({ thread, socketMessage }) {
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext).authState;
    useEffect(() => {
        if (socketMessage) {
            setMessages((messages) => [...messages, socketMessage]);
        }
    }, [socketMessage])
    const threadBoxRef = useRef();


    async function getMessages() {
        try {
            const response = await axios.get(`${apiURL}/message/${thread._id}`, {
                withCredentials: true,
            })
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
        if (threadBoxRef.current) {
            threadBoxRef.current.scrollTop = threadBoxRef.current.scrollHeight
        }
    })

    useEffect(() => {
        getMessages();
    }, [thread])
    return (
        <>
            <div className="w-full flex gap-3 items-center border-b shadow-sm p-5">
                <img className="rounded-full w-12 h-12" src="https://i.stack.imgur.com/l60Hf.png" alt="avatar" />
                <p>
                    {
                        thread.members.map((member) => {
                            return member.nickName
                        }).join(',')
                    }
                </p>
            </div>
            <div ref={threadBoxRef} className="w-full flex flex-col p-8 overflow-y-scroll">
                {
                    messages.map((message, index) => {
                        return (
                            <div key={index} className={
                                `w-full max-w-prose my-2  ${message.sender._id === user._id ? "ml-auto text-white " : "mr-auto"} `
                            }>
                                <Message isSender={message.sender._id === user._id} message={message} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Thread;