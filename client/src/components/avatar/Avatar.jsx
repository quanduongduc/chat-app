function Avatar({ avatarPath, handleClick, ...rest }) {
    console.log(avatarPath);
    return (
        <img className="w-full h-full" src={avatarPath} alt="avatar" onClick={handleClick} {...rest} />
    )
}

export default Avatar;