import { useState } from 'react';
import { DateFormat } from '../../utils/DateTimeFormatter'
import documentIcon from '../../assets/images/document.svg'

function Message({ message, isSender, isLast }) {
    const { attachments, text, sender: { nickName }, createdAt } = message
    const [isShowTime, setShowTime] = useState(false);
    let timeout = null;
    const showTime = () => {
        timeout = setTimeout(() => {
            setShowTime(true)
        }, 700);
    }

    const hideTime = () => {
        clearTimeout(timeout);
        setShowTime(false);
    }

    const scrollTo = (e) => {
        console.log(e.target);
        console.log("loaded");
        e.target.scrollIntoView();
    }

    return (
        <>
            <div onMouseOver={showTime} onMouseOut={hideTime} className={`relative gap-2 max-w-full flex flex-wrap ${isSender ? "ml-auto justify-end" : ""}`}>
                {
                    text &&
                    <div className='max-w-full flex-1 basis-full w-full'>
                        <div className={`py-4 px-6 max-w-fit rounded-3xl text-sm ${isSender ?
                            "bg-darkCyan ml-auto"
                            :
                            "bg-lightestGray"
                            }`}>
                            <p className="max-w-full break-words">{!isSender && nickName + " : "}{text}</p>
                        </div>
                    </div>
                }
                {
                    attachments.map((attachment) => {
                        const { type, path, name, _id } = attachment;
                        switch (type) {
                            case "image":
                                return <img onLoad={isLast && scrollTo} className="hover:opacity-80 flex-grow-0 cursor-pointer rounded-3xl max-w-[50%]" key={_id} src={path} alt={name} />

                            case "video":
                                return <video onLoad={isLast && scrollTo} className="rounded-3xl max-w-md w-md" key={_id} src={path} controls></video>
                            case "raw":
                                return (
                                    <div className='max-w-full flex-1 basis-full w-full'>
                                        <a key={_id} href={path} className={`flex items-center gap-2 py-4 px-6 max-w-fit w-fit rounded-3xl text-sm ${isSender ?
                                            "bg-darkCyan ml-auto text-right"
                                            :
                                            "bg-lightestGray text-left"
                                            }`}>
                                            <img src={documentIcon} alt="document icon" />
                                            <p>{name}</p>
                                        </a>
                                    </div>
                                )
                            default:
                                return (
                                    <div>
                                        <p key={_id}>File Invalid</p>
                                        <img src={documentIcon} alt="document icon" />
                                        <p>{name}</p>
                                    </div>
                                )
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