import ReactDOM from 'react-dom';
import { FC, ReactChild, ReactChildren, useRef, ReactFragment } from 'react';
import { useEffect, useCallback, ReactElement} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';

//import content from '../../svg';


interface IModal{
    children:React.ReactNode;
    onClose: ()=>void;
}


const Modal = ({children, onClose }:IModal) => {
    const portal = document.getElementById('portal') as HTMLElement;

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

    
    
    return ReactDOM.createPortal(
    
        <ModalOverlay onClose={onClose}>
            <div onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-10 mr-10 ml-10'}>
                    <div className={style.btn}>
                        <CloseIcon type='secondary' onClick={()=>{onClose()}}/>
                    </div>
                </div>
                {children}
            </div>
        </ModalOverlay>

    ,
    portal)
    
}

export default Modal