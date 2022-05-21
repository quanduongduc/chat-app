const Button = ({ children, disabled }) => {
    return <button className={`w-full py-3  text-white ring-[#0a7cff] focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 cursor-pointer ${disabled ? "bg-[#0099cc]" : "bg-[#0a7cff]"}`} disabled={disabled}>{children}</button>
}

export default Button