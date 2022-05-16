import { useDispatch } from 'react-redux';
import { CLOSE_INFO, CLOSE_ORDER } from '../../services/actions/detals';
import style from './style.module.css'

function Modal({children}){
    const dispatch = useDispatch()
    const setActive = ()=>{
        dispatch({type:CLOSE_ORDER});
        dispatch({type:CLOSE_INFO})
    }

    return  <div className={style.modal} onClick={setActive}>
                <div className={style.model_content} onClick={e=>e.stopPropagation()}>
                    {children}
                </div>
            </div>
}

export default Modal;