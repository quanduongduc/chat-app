import { useState } from 'react';
import { DateFormat } from '../../utils/DateTimeFormatter'

function Message({ message, isSender }) {
    console.log(message);
    const { attachments, text, sender: { nickName }, createdAt } = message
    const [isShowTime, setShowTime] = useState(false);
    let timeout = null;
    console.log(createdAt);
    console.log(typeof createdAt);
    console.log(new Date(Date.parse(createdAt)));
    const showTime = () => {
        timeout = setTimeout(() => {
            setShowTime(true)
        }, 700);
    }

    const hideTime = () => {
        clearTimeout(timeout);
        setShowTime(false);
    }

    return (
        <>
            <div onMouseOver={showTime} onMouseOut={hideTime} className={`relative max-w-fit flex justify-end flex-wrap ${isSender ? "ml-auto" : ""}`}>
                {
                    text &&
                    <div className={`py-4 px-6 max-w-full rounded-3xl text-sm ${isSender ?
                        "bg-darkCyan ml-auto"
                        :
                        "bg-lightestGray"
                        }`}>
                        <p className="max-w-full break-words">{!isSender && nickName + " : "}{text}</p>
                    </div>
                }
                {
                    attachments.map((attachment, index) => {
                        const { type, path, name } = attachment;
                        switch (type) {
                            case "image":
                                return <img className=" hover:opacity-80 cursor-pointer rounded-3xl max-w-[50%]" key={index} src={path} alt={name} />

                            case "video":
                                return <video className="rounded-3xl max-w-md w-md" key={index} src={path} controls></video>
                            case "raw":
                                return (
                                    <a href={path} className={`flex items-center gap-2 py-4 px-6 max-w-full rounded-3xl text-sm ${isSender ?
                                        "bg-darkCyan ml-auto text-right"
                                        :
                                        "bg-lightestGray text-left"
                                        }`}>
                                        <img src="/document.svg" alt="document icon" />
                                        <p>{name}</p>
                                    </a>
                                )

                            default:
                                return <p key={index}>File Invalid</p>
                        }
                    })
                }
                <div className={`absolute top-1/2 -translate-y-1/2 text-xs rounded-lg bg-[#1c1e21] p-2 text-white shadow-md 
                ${isSender ? "left-[-105px]" : "right-[-105px]"}
                ${!isShowTime ? "hidden" : ""}`
                }
                >
                    <p>{DateFormat(new Date(Date.parse(createdAt)))}</p>
                </div>
            </div>
        </>
    )
}

export default Message;