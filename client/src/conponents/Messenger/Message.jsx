
function Message({ message, isSender }) {
    const { attachments, text, sender: { nickName } } = message
    return (
        <>
            <div className={`max-w-fit flex justify-end ${isSender ? "ml-auto" : ""}`}>
                {
                    text &&
                    <div className={`py-4 px-6 max-w-full rounded-3xl text-sm ${isSender ?
                        "bg-darkCyan ml-auto text-right"
                        :
                        "bg-lightestGray text-left"
                        }`}>
                        <p className="max-w-full break-words">{!isSender && nickName + " : "}{text}</p>
                    </div>
                }
                {
                    attachments.map((attachment, index) => {
                        const { type, path, name } = attachment;
                        switch (type) {
                            case "image":
                                return <img className=" hover:opacity-80 cursor-pointer rounded-3xl max-w-md w-md" key={index} src={path} alt={name} />

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
            </div>
        </>
    )
}

export default Message;