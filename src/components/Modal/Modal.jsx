import style from './style.module.css'

function Modal({children, setActive}){
    return  <div className={style.modal} onClick={setActive}>
                <div className={style.model_content} onClick={e=>e.stopPropagation()}>
                    {children}
                </div>
            </div>
}

export default Modal;