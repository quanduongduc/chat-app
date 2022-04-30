import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../form/Button'
import TextField from '../form/TextField'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../avatar/Avatar'
import imagePicker from '../../assets/images/Frame.svg'

const Register = () => {
    const [userInput, setUserInput] = useState({
        nickName: '',
        userName: '',
        avatar: null,
        password: '',
        confirmPassword: '',
    })

    const { register, authState: { isAuthenticated } } = useContext(AuthContext);

    const handleChange = (e) => {
        const { value, name, files } = e.target;
        if (files) {
            if (files.length) { // if file was chosen
                setUserInput(prev => {
                    const preview = URL.createObjectURL(files[0]);
                    files[0].preview = preview;
                    return {
                        ...prev,
                        avatar: files[0],
                    }
                })
            }
        } else {
            setUserInput(prev => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }
    }

    useEffect(() => {
        return () => {
            if (userInput.avatar) {
                URL.revokeObjectURL(userInput.avatar.preview);
            }
        }
    }, [userInput.avatar])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputFormData = new FormData();
        for (const key in userInput) {
            inputFormData.append(key, userInput[key]);
        }
        await register(inputFormData);
    }

    const Inputs = [
        { id: "nickName", type: "text", placeholder: "nickName", value: `${userInput.nickName}`, name: 'nickName' },
        { id: "text", type: "text", placeholder: "UserName", value: `${userInput.userName}`, name: 'userName' },
        { id: "password", type: "password", placeholder: "Password", value: `${userInput.password}`, name: 'password' },
        { id: "confirmPassword", type: "password", placeholder: "confirmPassword", value: `${userInput.confirmPassword}`, name: 'confirmPassword' },
        { id: "image", type: "file", accept: "image/*", placeholder: "", hidden: true, name: 'image', },
    ]

    return (
        <main className="h-screen w-full banner">
            <div className="flex flex-col justify-center items-center h-screen">
                <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6">
                        {Inputs.map((input, index) => (
                            <TextField className={`${input.hidden ? "hidden" : ""}`}
                                id={input.id}
                                key={index}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={input.value}
                                name={input.name}
                                accept={input.accept}
                                onChange={handleChange}
                            />
                        ))}
                        <label className='flex gap-2 items-center' htmlFor="image">
                            <div className='w-6 h-6'>
                                <img src={imagePicker} alt="choose attachment" />
                            </div>
                            <p>Choose Your Profile Image</p>
                        </label>
                        {userInput.avatar &&
                            <div>
                                <Avatar avatarPath={userInput.avatar.preview}></Avatar>
                            </div>}
                    </div>

                    <Button text="Sign Up" />
                    <Link to="/login">
                        <p className="text-base text-primary text-center my-6 hover:underline">
                            {isAuthenticated ? "Back To Chat" :
                                "Already have an account ?"
                            }</p>
                    </Link>
                </form>
            </div>
        </main>
    )
}

export default Register