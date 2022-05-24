import ReactDOM from 'react-dom';

import { useEffect, useCallback} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({children, onClose }){

    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        };
    }, [onClose]);

    useEffect(()=>{
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction])

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <span onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-10 mr-10 ml-10'}>
                    <div className={style.btn}>
                        <CloseIcon onClick={()=>{onClose()}}/>
                    </div>
                </div>
                {children}
            </span>
        </ModalOverlay>,
        document.getElementById('portal'))
}

export default Modal;