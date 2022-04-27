import PropTypes from 'prop-types';

import { } from '@ya.praktikum/react-developer-burger-ui-components'

import IconClose from '../../images/iconClose.svg'
import style from './style.module.css'

import dataPropTypes from '../../utils/type.js'


function IngredientDetails({setActive, data}){
    
    return(
            <span className={style.model_content + ' mt-10 ml-10 mr-10 mb-15'}>
                <div className={style.modal_top}>
                    <p className="text text_type_main-large mr-20">Детали ингредиента</p>
                    <button className={style.btn} onClick={setActive}>
                        <img src={IconClose} alt="X" />
                    </button>
                </div>
                
                <img src={data.image_large} alt='img'/>

                <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>

                <div className={style.model_info}>
                    <span >
                        <p className="text text_type_main-default secondary">Калории,ккал</p>
                        <p className="text text_type_main-default secondary">{data.calories}</p>
                    </span>

                    <span className='ml-5'>
                        <p className="text text_type_main-default secondary">Белки, г</p>
                        <p className="text text_type_main-default secondary">{data.proteins}</p>
                    </span>

                    <span className='ml-5'>
                        <p className="text text_type_main-default secondary">Жиры, г</p>
                        <p className="text text_type_main-default secondary">{data.fat}</p>
                    </span>

                    <span className='ml-5' >
                        <p className="text text_type_main-default secondary">Углеводы, г</p>
                        <p className="text text_type_main-default secondary">{data.carbohydrates}</p>
                    </span>
                </div>
            </span>
    )
}

IngredientDetails.propTypes = {
    data: PropTypes.objectOf(dataPropTypes).isRequired,
    setActive: PropTypes.func
}

export default IngredientDetails