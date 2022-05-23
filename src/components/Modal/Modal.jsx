import ReactDOM from 'react-dom';

import { useEffect, useCallback} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'

function Modal({children, closeAllPopups }){

    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
            closeAllPopups();
        };
    }, [closeAllPopups]);

    useEffect(()=>{
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction])

    return ReactDOM.createPortal(
        <div className={style.modal} onClick={()=>{closeAllPopups()}} >
            <span onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-10 mr-10 ml-10'}>
                    <div className={style.btn}>
                        <CloseIcon onClick={()=>{closeAllPopups()}}/>
                    </div>
                </div>
                {children}
            </span>
        </div>,
        document.getElementById('portal'))
}

export default Modal;