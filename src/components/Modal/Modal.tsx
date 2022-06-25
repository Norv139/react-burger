import ReactDOM from 'react-dom';
import { FC } from 'react';
import { useEffect, useCallback, ReactElement} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { strict } from 'assert';

interface IModat{
    children: ReactElement;
    onClose: ()=>void;
}

const Modal = ({children, onClose }:IModat)=>{
    const portal: HTMLElement | null = document.getElementById('portal');

    const escFunction = useCallback((event:any) => {
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
    if (portal){
    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <span onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-10 mr-10 ml-10'}>
                    <div className={style.btn}>
                        <CloseIcon type='secondary' onClick={()=>{onClose()}}/>
                    </div>
                </div>
                {children}
            </span>
        </ModalOverlay>,
        portal
        )
    }
}


export default Modal;