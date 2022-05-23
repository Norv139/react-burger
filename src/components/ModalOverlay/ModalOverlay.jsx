import style from './style.module.css'

import { useEffect, useCallback} from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
  



function ModalOverlay({children, fnClose}){
    

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
        <div className={style.modal} onClick={()=>{fnClose()}} >
            <span onClick={e=>e.stopPropagation()} className={style.model_content}> 
                <div className={style.model_close_btn + ' mt-10 mr-10 ml-10'}>
                    <div className={style.btn}>
                        <CloseIcon onClick={()=>{fnClose()}}/>
                    </div>
                </div>
                {children}
            </span>
        </div>
        )
}



export default ModalOverlay;