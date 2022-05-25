import style from './style.module.css'

function ModalOverlay({children, onClose}){
    return(
            <div className={style.modal} onClick={()=>{onClose()}}>
                {children}
            </div>
        )
}

export default ModalOverlay;