function ThreadBar({ threads, currentThread, setCurrentThread }) {
    const caculateDateDiff = (d1, d2) => {
        if (d1 && d2) {
            const diff = d1 - d2;
            const dateDiff = diff / (1000 * 3600 * 24)
            return Math.abs(dateDiff);
        }
        return undefined;
    }
    return (
        <div className="flex flex-col w-1/4 gap-7 justify-start items-center min-h-full py-8 text-base bg-lightestGray px-2">
            <h2 className="w-full ml-right text-2xl font-semibold">Messages</h2>
            <div className="flex gap-2 border border-solid rounded-3xl px-5 py-2 border-lightGray w-full">
                <img src="/fi_search.svg" alt="search icon" />
                <input className="w-full outline-none" type="text" placeholder="Search people or message" />
            </div>
            <div className="w-full flex flex-col justify-center gap-4">
                {
                    threads.map((thread, index) => {
                        return (
                            <div
                                className={`flex items-center gap-3 w-full cursor-pointer hover:bg-lightGray rounded-lg px-3 py-5 ${thread._id === currentThread._id && "bg-lightGray"
                                    }`}
                                key={index} onClick={() => {
                                    if (currentThread !== thread._id) {
                                        setCurrentThread(thread)
                                    }
                                }}>
                                <img className="rounded-full w-12 h-12" src="https://i.stack.imgur.com/l60Hf.png" alt="avatar" />
                                <div className="w-full flex justify-between">
                                    <p>
                                        {
                                            thread.members.length ?
                                                thread.members.map((member) => {
                                                    return member.nickName;
                                                }).join(',')
                                                :
                                                "Only You"
                                        }
                                    </p>
                                    <p className="self-end">{
                                        caculateDateDiff(new Date(Date.parse(thread.updatedAt)), Date.now())
                                            > 1 ?
                                            new Date(Date.parse(thread.updatedAt)).toLocaleDateString([], {
                                                month: "long",
                                                day: "numeric"
                                            })
                                            :
                                            new Date(Date.parse(thread.updatedAt)).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                    }</p>
                                </div>
                                <div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default ThreadBar;