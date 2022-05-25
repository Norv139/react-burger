import { useSelector, useDispatch } from 'react-redux';

import { } from '@ya.praktikum/react-developer-burger-ui-components'

import ImgDone from '../../images/done.svg'

import { CLOSE_ORDER } from '../../services/actions/detals';

import style from './style.module.css'

function OrderDetails(){

    const dispatch = useDispatch()
    const {isOpenOrder, order} = useSelector(state => state.detals)

    const setActive = () => {
        dispatch({type:CLOSE_ORDER})
    }

    return(  
            <>
                { isOpenOrder &&

                        <span>
                            <div className={style.model_main+' mr-25 ml-25'}>
                                <p className="text text_type_digits-large mt-9">{order.order.number}</p>

                                <p className="text text_type_main-default mt-8">идентификатор заказа</p>

                                <img src={ImgDone} alt='V' className='mt-15 mb-15' />

                                <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>

                                <p className={"text text_type_main-default mb-30 " + style.secondary}>Дождитесь готовности на орбитальной станции</p>
                            </div>
                        </span>
                    
                }     
            </>
        )
}


export default OrderDetails