import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiURL } from "../../constants/constants";
import Thread from "./Thread";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../context/SocketContext";
import ThreadBar from "../layout/ThreadBar";


function MessageBox() {
    const [threads, setThreads] = useState(null);
    const [currentThread, setCurrentThread] = useState(null);
    const [socketMessage, setSocketMessage] = useState();

    const socket = useContext(SocketContext).socket;
    socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        switch (data.event) {
            case "returnMessage":
                setSocketMessage(data.message)
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
        if (socketMessage && currentThread) {
            if (socketMessage.threadId !== currentThread._id) {
                const newSortedThreads = threads.filter((thread) => {
                    return thread._id !== socketMessage.threadId;
                });
                newSortedThreads.unshift({
                    _id: socketMessage.threadId,
                })
                setThreads(newSortedThreads);
            }

        }
    }, [socketMessage])
    return (
        <>
            {threads && currentThread ?
                <div className="flex max-h-[100vh]">
                    <ThreadBar threads={threads}
                        currentThread={currentThread}
                        setCurrentThread={setCurrentThread} />
                    <div className="w-full flex flex-col ">
                        <Thread thread={currentThread} socketMessage={socketMessage?.threadId === currentThread._id ? socketMessage : null}></Thread>
                        <MessageInput threadId={currentThread._id}></MessageInput>
                    </div>
                </div>
                :
                <img src='/Spinner-1.2s-231px.gif' alt="" />
            }
        </>
    )
}

export default MessageBox;