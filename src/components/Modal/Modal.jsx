import style from './style.module.css'

import { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CLOSE_INFO, CLOSE_ORDER } from '../../services/actions/detals';

  



function Modal({children}){
    const dispatch = useDispatch()

    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
        dispatch({type:CLOSE_ORDER});
        dispatch({type:CLOSE_INFO})
        }
    }, [dispatch]);

    useEffect(()=>{
        document.addEventListener("keydown", escFunction);
        return () => {
        document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction, dispatch])


    return  (<div >{children}</div>)
}

export default Modal;