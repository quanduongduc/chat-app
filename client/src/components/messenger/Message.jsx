import { useEffect, useState } from 'react';
import { DateFormat } from '../../utils/DateTimeFormatter'
import documentIcon from '../../assets/images/document.svg'
import Avatar from '../avatar/Avatar';

function Message({ message, isSender, isLast }) {
    const { attachments, text, sender: { nickName, avatarPath }, createdAt } = message
    console.log(message);
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
        e.target.scrollIntoView();
    }
    useEffect(() => {
        return () => {
            attachments.forEach((attachment) => {
                console.log("revoke");
                URL.revokeObjectURL(attachment.path)
            })
        }
    }, [])
    return (
        <>
            <div onMouseOver={showTime} onMouseOut={hideTime} className={`relative gap-2 max-w-full flex flex-wrap items-center ${isSender ? "ml-auto justify-end" : ""}`}>
                {
                    !isSender &&
                    <div className='flex-0 w-9 h-9 flex gap-2 rounded-full overflow-hidden items-center'>
                        <Avatar avatarPath={avatarPath} alt={nickName} />
                    </div>
                }
                {
                    text &&
                    <div className='max-w-full flex-1  w-full'>
                        <div className={`py-4 px-6 max-w-fit rounded-3xl text-sm ${isSender ?
                            "bg-darkCyan ml-auto"
                            :
                            "bg-lightestGray"
                            }`}>
                            <p className='max-w-full break-words'>{text}</p>
                        </div>
                    </div>
                }

                {
                    attachments.map((attachment) => {
                        if (!attachment.path) {
                            attachment.path = URL.createObjectURL(attachment);
                        }
                        const imgTypeRegrex = /(image).*/i
                        const videoRegrex = /(video).*/i
                        const { type, name, path, _id } = attachment;
                        switch (true) {
                            case imgTypeRegrex.test(type):
                                return <img onLoad={isLast ? scrollTo : undefined} className="hover:opacity-80 cursor-pointer rounded-3xl max-w-[49%]" key={_id} src={path} alt={name} />
                            case videoRegrex.test(type):
                                return <video onLoad={isLast ? scrollTo : undefined} className="rounded-3xl max-w-md w-md" key={_id} src={path} controls></video>
                            default:
                                return (
                                    <div className={`flex-1 w-full basis-full ${isSender && "flex justify-end"}`}>
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
            </div >
        </>
    )
}

export default Message;