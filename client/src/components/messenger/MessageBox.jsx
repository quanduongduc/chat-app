import axios from "axios";
import { useContext, useEffect, useState } from "react";
import loadingIcon from '../../assets/images/Spinner-1.2s-231px.gif';
import { apiURL } from "../../constants/constants";
import { SocketContext } from "../../context/SocketContext";
import ThreadBar from "../layout/ThreadBar";
import MessageInput from "./MessageInput";
import Thread from "./Thread";
import ThreadMatching from "./ThreadMatching";

function MessageBox() {
    const [threads, setThreads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentThread, setCurrentThread] = useState(null);
    const [socketMessage, setSocketMessage] = useState();

    const socket = useContext(SocketContext).socket;
    socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        switch (data.event) {
            case "returnMessage":
                console.log(data);
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
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }

    const handleThreadSwitch = async (userId) => {
        try {
            const res = await axios.post(`${apiURL}/thread/${userId}`, {}, {
                withCredentials: true,
            })
            if (res.data.success) {
                if (currentThread) {
                    if (currentThread._id !== res.data.thread._id) {
                        setCurrentThread(res.data.thread)
                    }
                } else {
                    setCurrentThread(res.data.thread);
                }

                setThreads(prev => {
                    const isExisted = prev.some((thread) => {
                        return thread._id === res.data.thread._id;
                    });
                    if (!isExisted) {
                        return [...prev, res.data.thread]
                    } else {
                        return prev;
                    }
                })
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
        if (!socketMessage) {
            return;
        }
        console.log(socketMessage);
        if (threads.findIndex((thread) => {
            return thread._id === socketMessage.thread._id;
        }) === -1) {
            setThreads([...threads, socketMessage.thread])
        }
        if (!currentThread) {
            return;
        }
        if (socketMessage.thread._id !== currentThread._id) {
            const newSortedThreads = threads.filter((thread) => {
                return thread._id !== socketMessage.thread._id;
            });
            newSortedThreads.unshift(socketMessage.thread)
            setThreads(newSortedThreads);
        }
    }, [socketMessage])
    return (
        <>
            {
                !isLoading ?
                    <div className="flex max-h-[100vh]">
                        {

                            <ThreadBar threads={threads}
                                currentThread={currentThread}
                                setCurrentThread={setCurrentThread}
                                handleThreadSwitch={handleThreadSwitch} />
                        }
                        {
                            threads.length ?
                                <div className="w-full flex flex-col">
                                    {
                                        currentThread &&
                                        <>
                                            <Thread thread={currentThread}
                                                socketMessage={currentThread && socketMessage?.thread?._id === currentThread._id ? socketMessage : null}></Thread>
                                            <MessageInput thread={currentThread}
                                                setSocketMessage={setSocketMessage}></MessageInput>
                                        </>
                                    }

                                </div> :
                                <ThreadMatching handleThreadSwitch={handleThreadSwitch} />
                        }
                    </div>
                    :
                    <img src={loadingIcon} alt="loading" />
            }
        </>
    )
}

export default MessageBox;