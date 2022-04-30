import { useState, useContext, useRef, useEffect } from "react";
import { DateFormat } from "../../utils/DateTimeFormatter";
import { AuthContext } from '../../context/AuthContext';
import { debounce } from '../../utils/Debounce';
import axios from "axios";
import { apiURL } from "../../constants/constants";
import { ReactComponent as SearchIcon } from '../../assets/images/fi_search.svg'
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";

function ThreadBar({ threads, currentThread, setCurrentThread, setThreads }) {
    const [searchUser, setSearchUser] = useState('');
    const { authState: { user }, logout } = useContext(AuthContext);
    const [serachedUsers, setSearchedUsers] = useState
        ([])
    const navigate = useNavigate();

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
            setSearchedUsers([]);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }

    const fetchUser = async (searchUser) => {
        if (searchUser) {
            try {
                const res = await axios.post(`${apiURL}/user`, {
                    nickName: searchUser
                })
                if (res.data.success) {
                    setSearchedUsers(res.data.users);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
                console.log(error);
            }
        } else {
            setSearchedUsers([]);
        }
    }

    const debounced = useRef(debounce(fetchUser, 500))


    const handleSearchChange = (e) => {
        setSearchUser(e.target.value);
    }

    useEffect(() => {
        debounced.current(searchUser);
    }, [searchUser])

    return (
        <div className="flex flex-col w-1/4 justify-start items-center min-h-screen max-h-[100vh] pt-8 text-base bg-lightestGray ">
            <h2 className="w-full ml-right text-2xl font-semibold">Messages</h2>
            <div className="relative flex gap-2 border border-solid rounded-3xl px-5 py-2 my-5 border-lightGray w-full">
                <SearchIcon></SearchIcon>
                <input className="w-full outline-none" type="text" value={searchUser} onChange={handleSearchChange} placeholder="Search people or message" />
                <div className="w-full gap-4 overflow-y-auto scrollbar absolute top-[calc(100%+20px)] left-0 flex flex-col justify-center bg-lightestGray">
                    {
                        serachedUsers.map((user, index) => {
                            return (
                                <div key={index} className="flex items-center gap-3 w-full cursor-pointer hover:bg-lightGray rounded-lg px-3 py-5" onClick={() => { handleThreadSwitch(user._id) }}>
                                    <div className="rounded-full w-12 h-12 overflow-hidden" >
                                        <Avatar avatarPath={user.avatarPath}></Avatar>
                                    </div>
                                    <p className="text-xl font-semibold">{user.nickName}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full flex flex-grow flex-col gap-4 overflow-y-auto scrollbar">
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
                                <div className="rounded-full w-12 h-12 overflow-hidden" >
                                    <Avatar avatarPath={user.avatarPath}></Avatar>
                                </div>
                                <div className="w-full flex justify-between">
                                    <p className="font-semibold">
                                        {
                                            thread.members.length ?
                                                thread.members.map((member) => {
                                                    return member.nickName;
                                                }).join(',')
                                                :
                                                "Only You"
                                        }
                                    </p>
                                    <p className="self-end font-semibold">
                                        {DateFormat(new Date(Date.parse(thread.updatedAt)))}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="relative group flex gap-3 bg-inherit items-center w-full p-5 border-t border-[rgba(0,0,0,0.16)] border-solid">
                <div className="rounded-full w-12 h-12 overflow-hidden cursor-pointer hover:opacity-70" >
                    <Avatar avatarPath={user.avatarPath}></Avatar>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{user.nickName}</p>
                    <p className="text-sm font-regular">@{user.userName}</p>
                </div>
                <div className="hidden bg-lightestGray flex-col absolute bottom-full left-0 w-full group-hover:flex">
                    <button className="p-3 border border-[rgba(0,0,0,.09)] border-solid hover:opacity-70 " onClick={() => navigate('/register')}>Register New Account</button>
                    <button onClick={logout} className="p-3 border border-[rgba(0,0,0,.09)] border-solid hover:opacity-70 ">Logout</button>
                </div>
            </div>
        </div >
    )
}

export default ThreadBar;