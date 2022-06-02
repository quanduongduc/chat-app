import Button from "../form/Button";
import { apiURL } from "../../constants/constants";
import axios from "axios";
import { useState } from "react";
import Avatar from "../avatar/Avatar";

function ThreadMatching({ handleThreadSwitch }) {
    const [otherUsers, setOtherUsers] = useState([]);

    function handleOtherUserClick(userId) {
        handleThreadSwitch(userId);
    }

    async function handleThreadMatching() {
        try {
            const res = await axios.get(`${apiURL}/user/random`)
            console.log(res);
            if (res.data.success) {
                setOtherUsers(res.data.users);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }

    }

    return (
        <div className="flex flex-col justify-start gap-4 max-w-lg self-center m-auto">
            <h2 className=" text-4xl font-bold">You don't have a message
                selected.</h2>
            <p className=" text-base text-glareGray">Choose one from your existing messages, or start a new one.</p>
            <Button onClick={handleThreadMatching} className="flex self-start items-center justify-center py-4 px-12 mt-2 bg-glareGray border-8 text-white rounded-full hover:opacity-80">Random Matching</Button>
            {
                otherUsers.length ?
                    <div className="flex flex-col gap-4">
                        <p className="text-base text-glareGray">Select one other user : </p>
                        {
                            otherUsers.map(user => {
                                return <div onClick={() => handleOtherUserClick(user._id)} className="flex justify-start items-center gap-3 bg-darkCyan px-2 py-3 rounded-full cursor-pointer hover:opacity-80">
                                    <div className="rounded-full w-12 h-12 overflow-hidden">
                                        <Avatar key={user._id} avatarPath={user.avatarPath}></Avatar>

                                    </div>
                                    <p className="text-white">{user.nickName}</p>
                                </div>
                            })
                        }
                    </div> : undefined
            }

        </div>
    )
}

export default ThreadMatching;