function Toast({ message, type, setShowToast }) {
    let Toast = "";
    let timeout;
    setTimeout(() => {
        setShowToast({
            show: false,
            message: "",
            type: null,
        })
    }, 5000)

    function handleRemoveToast() {
        clearTimeout(timeout);
        setShowToast({
            show: false,
            message: "",
            type: null,
        })
    }

    switch (type) {
        case "success":
            Toast = (<div className="flex items-center bg-green-500 border-l-4 border-green-700 py-4 px-6 shadow-md mb-2 rounded-lg">
                < div className="text-green-500 rounded-full bg-white mr-3 cursor-pointer" onClick={handleRemoveToast} >
                    <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                    </svg>
                </ div>
                <div className="text-white max-w-xs " >
                    {message}
                </div >
            </div >)
            break;
        case "info":
            Toast = (<div className="flex items-center bg-blue-400 border-l-4 border-blue-700 py-4 px-6 shadow-md mb-2 rounded-lg" >
                <div className="text-blue-500 rounded-full bg-white mr-3" >
                    <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                        <circle cx="8" cy="4.5" r="1" />
                    </svg >
                </div >
                <div className="text-white max-w-xs " >
                    {message}
                </div >
            </div >)
            break;
        case "warning":
            Toast = (<div className="flex items-center bg-orange-400 border-l-4 border-orange-700 py-4 px-6 shadow-md mb-2 rounded-lg" >
                <div className="text-orange-500 rounded-full bg-white mr-3" >
                    <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-exclamation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg >
                </div >
                <div className="text-white max-w-xs " >
                    {message}
                </div >
            </div >)
            break;
        case "error":
            Toast = (<div className="flex items-center bg-red-500 border-l-4 border-red-700 py-4 px-6 shadow-md mb-2 rounded-lg" >
                <div className="text-red-500 rounded-full bg-white mr-3 cursor-pointer" onClick={handleRemoveToast} >
                    <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                    </svg >
                </div >
                <div className="text-white max-w-xs " >
                    {message}
                </div >
            </div>)
            break;
        default:
            break;
    }

    return (
        <div className="absolute bottom-2 right-2 animate-bounce">
            {Toast}
        </div>
    )
}

export default Toast;