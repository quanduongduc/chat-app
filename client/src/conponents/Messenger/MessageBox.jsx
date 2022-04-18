import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiURL } from "../../constants/constants";
import Thread from "./Thread";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../context/SocketContext";


function MessageBox() {
    const [threads, setThreads] = useState(null);
    const [currentThread, setCurrentThread] = useState(null);
    const [socketMessage, setSocketMessage] = useState();

    const socket = useContext(SocketContext).socket;

    socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        switch (data.event) {
            case "returnMessage":
                setSocketMessage(data)
                break;
            case "retrunTyping":
                break;
            default:
                break;
        }
    }
    async function getThreads() {
        try {
            const res = await axios.get(`${apiURL}/thread`, {
                withCredentials: true,
            })
            if (res.data.success) {
                const threads = res.data.threads.sort((a, b) => {
                    const time1 = Date.parse(a.updatedAt);
                    const time2 = Date.parse(b.updatedAt)
                    return time2 - time1;
                });
                setThreads(threads);
                setCurrentThread(threads[0]);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }


    useEffect(() => {
        getThreads();
    }, [])


    useEffect(() => {
        if (socketMessage?.threadId !== currentThread?._id) {
            const newSortedThreads = threads.filter((thread) => {
                return thread._id !== socketMessage.threadId;
            });
            newSortedThreads.unshift({
                _id: socketMessage.threadId,
            })
            setThreads(newSortedThreads);
        }
    }, [socketMessage])
    return (
        <>
            {threads && currentThread ?
                <>
                    <h2>MessageBox</h2>
                    {
                        threads.map((thread, index) => {
                            return (
                                <button key={index} onClick={() => {
                                    setCurrentThread(thread);
                                }}>
                                    {thread._id}
                                </button>
                            )
                        })
                    }
                    <Thread threadId={currentThread._id} socketMessage={socketMessage?.threadId === currentThread._id ? socketMessage : null}></Thread>
                    <MessageInput threadId={currentThread._id}></MessageInput>
                </>
                :
                <img src='/Spinner-1.2s-231px.gif' alt="" />
            }
        </>
    )
}

export default MessageBox;