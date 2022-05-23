import style from './style.module.css'

import { useEffect, useCallback} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
  



function Modal({children, fnClose}){
    

    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
            fnClose()
        }
    }, [fnClose]);

    useEffect(()=>{
        document.addEventListener("keydown", escFunction);
        return () => {
        document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction])


    return  (
        <div className={style.modal}>
            <span onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-15 mr-10 ml-10'}>
                    <CloseIcon onClick={()=>{fnClose()}} className={style.btn}/>
                </div>
                {children}
            </span>
        </div>
        )
}



export default Modal;