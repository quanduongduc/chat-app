import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import loadingIcon from '../../assets/images/Spinner-1.2s-231px.gif';
import { apiURL } from "../../constants/constants";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../avatar/Avatar";
import Message from "./Message";


function Thread({ thread, socketMessage }) {
    const { members } = thread;
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext).authState;

    const threadBoxRef = useRef();

    async function getMessages() {
        try {
            setLoading(true)
            const response = await axios.get(`${apiURL}/message/${thread._id}`, {
                withCredentials: true,
            })
            if (response.data.success) {
                setMessages(response.data.messages);
                setLoading(false);
                scrollToEnd();
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }

    function scrollToEnd() {
        console.log("Scroll to end");
        threadBoxRef.current.scrollTop = threadBoxRef.current.scrollHeight;
    }

    useEffect(() => {
        if (socketMessage) {
            setMessages((messages) => [...messages, socketMessage]);
        }
    }, [socketMessage])

    useEffect(() => {
        scrollToEnd();
    }, [messages])

    useEffect(() => {
        getMessages();
        return () => {
            setLoading(true);
        }
    }, [])

    useEffect(() => {
        getMessages();
    }, [thread])
    return (
        <>
            <div className="w-full flex gap-3 items-center border-b shadow-sm p-5">
                <div className="rounded-full w-12 h-12 overflow-hidden">
                    {
                        members.some(member => member._id !== user.id) ?
                            members.filter(member => member._id !== user._id).map(function (member) {
                                return <Avatar key={member._id} avatarPath={member.avatarPath}></Avatar>
                            })
                            :
                            <Avatar avatarPath={user.avatarPath}></Avatar>
                    }
                </div>
                <p>
                    {
                        members.some(member => member._id !== user.id) ?
                            members.filter(member => member._id !== user._id).map(function (member) {
                                return member.nickName
                            }).join(',')
                            :
                            "Only You"
                    }
                </p>
            </div>
            <div ref={threadBoxRef} className="relative w-full flex flex-1 flex-col p-8 overflow-y-scroll">
                {
                    !loading ?
                        messages.map((message, index) => {
                            return (
                                <div key={message._id} className={
                                    `w-full max-w-prose my-2  ${message.sender._id === user._id ? "ml-auto text-white " : "mr-auto"} `
                                }>
                                    <Message isSender={message.sender._id === user._id} message={message} isLast={index === messages.length - 1} />
                                </div>
                            )
                        })
                        :
                        <div className="absolute top-[50%] right-[50%] -translate-y-1/2 translate-x-1/2">
                            <img src={loadingIcon} alt="loading" />
                        </div>
                }

            </div>
        </>
    )
}

export default Thread;