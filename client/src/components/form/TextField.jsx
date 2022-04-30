const TextField = ({ className, ...rest }) => {
    return (
        <>
            <input {...rest} className={`${className} w-full px-4 py-3 rounded-lg ring-[#0a7cff] focus:ring-4 focus:outline-none transition duration-300 border border-[#0a7cff] focus:shadow-xl`} />
        </>
    )
}

export default TextField