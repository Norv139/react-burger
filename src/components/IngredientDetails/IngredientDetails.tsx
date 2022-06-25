
import { useSelector } from 'react-redux';

import style from './style.module.css'
import { TdataPropTypes } from '../../utils/type/type';


interface IStore{
    detals: {
        info: TdataPropTypes;
        isOpenInfo: boolean;
    }
}

function IngredientDetails(){
    
    const data = useSelector((state:IStore)=>state.detals.info)
    const isOpenInfo = useSelector((state:IStore)=>state.detals.isOpenInfo)


    
    return( 
        <>
            { isOpenInfo &&
                <div className={style.modal}>
                    <p className="text text_type_main-medium ml-10"> Детали ингидиета </p>
                    <span className={style.model_content + ' pt-10 pl-10 pr-10 pb-15'}>
                        
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
                </div>
            } 
        </>
            
    )
}

export default IngredientDetails