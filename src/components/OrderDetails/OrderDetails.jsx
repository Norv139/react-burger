import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { } from '@ya.praktikum/react-developer-burger-ui-components'

import ImgDone from '../../images/done.svg'
import IconClose from '../../images/iconClose.svg'

import style from './style.module.css'


function OrderDetails({setActive}){
    return ReactDOM.createPortal(
        <div className={style.modal} onClick={setActive}>
            <div className={style.model_content} onClick={e=>e.stopPropagation()}>

                <span onClick={e=>e.stopPropagation()}> 
                    <div className={style.model_close_btn + ' mt-15 mr-10 ml-10'}>
                        <button className={style.btn} onClick={setActive}>
                            <img src={IconClose} alt="X" />
                        </button>
                    </div>
                    
                    <div className={style.model_main+' mr-25 ml-25'}>
                        <p className="text text_type_digits-large mt-9">034536</p>

                        <p className="text text_type_main-default mt-8">идентификатор заказа</p>

                        <img src={ImgDone} alt='V' className='mt-15 mb-15' />

                        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>

                        <p className={"text text_type_main-default mb-30 " + style.secondary}>Дождитесь готовности на орбитальной станции</p>
                    </div>
                </span>

            </div>
        </div>,
        document.getElementById('portal')
    )
    
}

OrderDetails.propTypes={
    setActive: PropTypes.func
}


export default OrderDetails