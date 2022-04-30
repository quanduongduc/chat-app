function Avatar({ avatarPath, handleClick }) {
    return (
        <img className="w-full h-full" src={avatarPath} alt="avatar" onClick={handleClick} />
    )
}

export default Avatar;