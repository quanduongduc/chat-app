function Message({ message }) {
    const { attachments, text, sender: { nickName } } = message
    return (
        <>
            <p>{nickName} : {text}</p>
            {
                attachments.map((attachment, index) => {
                    const { type, path, name } = attachment;
                    switch (type) {
                        case "image":
                            return <img key={index} style={{ maxWidth: "300px" }} src={path} alt={name} />
                        case "video":
                            return <video key={index} src={path} controls></video>
                        case "raw":
                            return <a key={index} href={path}> {name}</a>

                        default:
                            return <p key={index}>File Invalid</p>
                    }
                })
            }
        </>
    )
}
export default Message;