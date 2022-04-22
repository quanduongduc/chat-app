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
    const [attachments, setAttractments] = useState([]);

    const messageUpload = async () => {
        let data = null;
        if (attachments) {
            const formData = new FormData();
            formData.append("sender", user._id)
            formData.append("threadId", threadId)
            formData.append("text", message)
            attachments.forEach((attractment) => {
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
        setAttractments([...attachments, ...e.target.files]);
        attractmentRef.current.value = "";
    }

    const handleRemoveAttachment = (att) => {
        const removedAttachments = attachments.filter((attachment) => {
            return attachment !== att
        })
        setAttractments(removedAttachments);
    }


    return (
        <>
            <div className='w-full'>
                <div className=' flex item-center gap-3 p-4'>
                    {
                        attachments.map((attachment, index) => {
                            const mediaTypeRegrex = /((image)|(video)).*/i
                            console.log(attachment.type);
                            console.log(mediaTypeRegrex.test(attachment.type));
                            if (mediaTypeRegrex.test(attachment.type)) {
                                const url = URL.createObjectURL(attachment)
                                return (
                                    <div className='relative w-16 h-16'>
                                        <img className='w-full h-full rounded-2xl' style={{ width: "300px" }}
                                            key={index}
                                            src={url}
                                            alt="preview" />
                                        <button className='absolute top-[-10px] right-[-10px] rounded-full bg-white p-2' onClick={() => handleRemoveAttachment(attachment)}>
                                            <img src="/icons8-close.svg" alt="close icon" />
                                        </button>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='relative flex gap-3 bg-lightGray items-center p-4 rounded-xl'>
                                        <img src="/document.svg" alt="document icon" />
                                        <p>{attachment.name}</p>
                                        <button className='absolute top-[-10px] right-[-10px] rounded-full bg-white p-2' onClick={() => handleRemoveAttachment(attachment)}>
                                            <img src="/icons8-close.svg" alt="close icon" />
                                        </button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <form className='w-full flex px-10 pb-10 gap-5 items-center' onSubmit={submitMessage}>
                    <div className='px-2'>
                        <label className='cursor-pointer' htmlFor="attachment">
                            <img src="/Frame.svg" alt="choose attachment" />
                        </label>
                        <input className='hidden' ref={attractmentRef} type="file" id='attachment' multiple onChange={attachmentOnchange} />
                    </div>
                    <div className='w-full flex justify-between gap-4'>
                        <input className='p-5 outline-none flex-1 rounded-3xl border-2 border-lightGray shadow-sm focus:border-darkCyan' type="text" value={message} onChange={messageOnchange} placeholder="Start a new message" />
                        <button className=' opacity-50 hover:opacity-100'>
                            <img src="/send.svg" alt="send icon" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MessageInput;