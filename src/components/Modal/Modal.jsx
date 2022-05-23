import ReactDOM from 'react-dom';

function Modal({children}){
    return ReactDOM.createPortal(<>{children}</>,document.getElementById('portal'))
}

export default Modal;