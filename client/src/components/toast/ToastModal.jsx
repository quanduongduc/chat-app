import ReactDOM from 'react-dom'

function ToastModal({ toast }) {
    return ReactDOM.createPortal(toast, document.querySelector('#toast_portal'))
}

export default ToastModal;