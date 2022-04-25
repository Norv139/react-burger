import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { } from '@ya.praktikum/react-developer-burger-ui-components'


import IconClose from '../../images/iconClose.svg'
import style from './style.module.css'



function IngredientDetails({setActive, data}){
    
    return ReactDOM.createPortal(
        <div className={style.modal} onClick={setActive}>
            <div className={style.model_content} onClick={e=>e.stopPropagation()}>
                
                <div className={style.modal_top+' ml-10 mr-10 mt-10'}>
                    <p className="text text_type_main-large mr-20">Детали ингредиента</p>
                    <button className={style.btn} onClick={setActive}>
                        <img src={IconClose} alt="X" />
                    </button>
                </div>
                
                <img src={data.image} alt='img'/>

                <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>

                <div className={style.model_info + ' mb-15'}>
                    <span >
                        <p className="text text_type_main-default secondary">Калории,ккал</p>
                        <p className="text text_type_main-default secondary">{IntToString(data.calories)}</p>
                    </span>

                    <span className='ml-5'>
                        <p className="text text_type_main-default secondary">Белки, г</p>
                        <p className="text text_type_main-default secondary">{IntToString(data.proteins)}</p>
                    </span>

                    <span className='ml-5'>
                        <p className="text text_type_main-default secondary">Жиры, г</p>
                        <p className="text text_type_main-default secondary">{IntToString(data.fat)}</p>
                    </span>

                    <span className='ml-5' >
                        <p className="text text_type_main-default secondary">Углеводы, г</p>
                        <p className="text text_type_main-default secondary">{IntToString(data.carbohydrates)}</p>
                    </span>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

IngredientDetails.propTypes = {
    data: PropTypes.object,
    setActive: PropTypes.func
}

function IntToString(int){

    const str = (int/10).toString().split('.')
    if (str.length === 1){
        return (int/10) + ',0'
    }
    else{
        return str[0]+','+str[1]
    }
        
}

IntToString.propTypes = {
    int: PropTypes.number.isRequired
}

export default IngredientDetails