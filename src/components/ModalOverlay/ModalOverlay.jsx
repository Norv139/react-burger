import ReactDOM from 'react-dom';

function ModalOverlay({children}){
    return ReactDOM.createPortal(<>{children}</>,document.getElementById('portal'))
}

export default ModalOverlay;