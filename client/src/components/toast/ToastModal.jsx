import ReactDOM from 'react-dom'

function ToastModal({ toast }) {
    console.log(toast);
    return ReactDOM.createPortal(toast, document.querySelector('#toast_portal'))
}

export default ToastModal;