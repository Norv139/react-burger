import React from 'react';
import style from './style.module.css'

interface IModalOverlay{
    children: React.ReactNode;
    onClose: ()=>void
}

const ModalOverlay = ({children, onClose}:IModalOverlay) => {
    return(
            <div className={style.modal} onClick={()=>{onClose()}}>
                {children}
            </div>
        )
}

export default ModalOverlay;