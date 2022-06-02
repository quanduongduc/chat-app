import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from '../../assets/images/fi_search.svg';
import { apiURL } from "../../constants/constants";
import { AuthContext } from '../../context/AuthContext';
import { DateFormat } from "../../utils/DateTimeFormatter";
import { debounce } from '../../utils/Debounce';
import Avatar from "../avatar/Avatar";

function ThreadBar({ threads, currentThread, setCurrentThread, handleThreadSwitch }) {
    const [searchUser, setSearchUser] = useState('');
    const { authState: { user }, logout } = useContext(AuthContext);
    const [serachedUsers, setSearchedUsers] = useState
        ([])
    const navigate = useNavigate();

    function handleSearchUserClick(userId) {
        handleThreadSwitch(userId);
        setSearchedUsers([]);
    }

    const fetchUser = async (searchUser) => {
        if (searchUser) {
            try {
                const res = await axios.get(`${apiURL}/user/search/${searchUser}`)
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
                <div className="w-full gap-4 max-h-[70vh] overflow-y-scroll scrollbar absolute top-[calc(100%+20px)] left-0 flex flex-col justify-center bg-lightestGray">
                    {
                        serachedUsers.map((user, index) => {
                            return (
                                <div key={user._id} className="flex items-center gap-3 w-full cursor-pointer hover:bg-lightGray rounded-lg px-3 py-5" onClick={() => { handleSearchUserClick(user._id) }}>
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
                    threads.map((thread) => {
                        return (
                            <div
                                className={`flex items-center gap-3 w-full cursor-pointer hover:bg-lightGray rounded-lg px-3 py-5 ${currentThread && thread._id === currentThread._id && "bg-lightGray"
                                    }`}
                                key={thread._id} onClick={() => {
                                    if (currentThread !== thread._id) {
                                        setCurrentThread(thread)
                                    }
                                }}>
                                <div className="rounded-full w-12 h-12 overflow-hidden" >

                                    {
                                        thread.members.length ?
                                            thread.members.map((member) => {
                                                if (member._id !== user._id) {
                                                    return <Avatar key={member._id} avatarPath={member.avatarPath}></Avatar>
                                                } else {
                                                    return null;
                                                }
                                            })
                                            :
                                            <Avatar avatarPath={user.avatarPath}></Avatar>
                                    }
                                </div>
                                <div className="w-full flex justify-between">
                                    <p className="font-semibold">
                                        {
                                            thread.members.some(member => member._id !== user.id) ?
                                                thread.members.filter(member => member._id !== user._id).map(function (member) {
                                                    return member.nickName
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
            <div className="relative group flex gap-3 bg-inherit items-center w-full p-5 border-t border-[rgba(0,0,0,0.16)] border-solid mt-auto">
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