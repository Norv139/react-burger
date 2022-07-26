import React, {useEffect} from "react"
import { useLocation } from 'react-router-dom';


import { TdataPropTypes} from '../utils/type/type';

import style from './styles.module.css'
import styleIngredient from './styleIngredient.module.css'
import { useAppDispatch, useAppSelector } from '../services/utils/hooks';
import { getAllItems } from '../services/action/getAllItems';




interface IResponse extends Response{
    data: {
        data: TdataPropTypes[]
    }
}

export const PageIngredient: React.FC = () =>  {  

    const dispatch = useAppDispatch()

    const location = useLocation();
    const id = location.pathname.split('/').pop();

    const items = useAppSelector((state)=>state.components.items)
    
    useEffect( ()=>{
            dispatch(getAllItems())
        },[]
    )

    const item = items.filter(x=>x._id == id)[0]
    
    return(
        <>
        <div className={style.over}>
            <main className={style.box}>
            {item !== undefined ? 
                (
                    <div className={styleIngredient.modal}>
                    <p className="text text_type_main-medium ml-10"> Детали ингидиета </p>
                    <span className={styleIngredient.model_content + ' pt-10 pl-10 pr-10 pb-15'}>
                        
                        <img src={item.image_large} alt='img'/>

                        <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>

                        <div className={styleIngredient.model_info}>
                            <span >
                                <p className="text text_type_main-default secondary">Калории,ккал</p>
                                <p className="text text_type_main-default secondary">{item.calories}</p>
                            </span>

                            <span className='ml-5'>
                                <p className="text text_type_main-default secondary">Белки, г</p>
                                <p className="text text_type_main-default secondary">{item.proteins}</p>
                            </span>

                            <span className='ml-5'>
                                <p className="text text_type_main-default secondary">Жиры, г</p>
                                <p className="text text_type_main-default secondary">{item.fat}</p>
                            </span>

                            <span className='ml-5' >
                                <p className="text text_type_main-default secondary">Углеводы, г</p>
                                <p className="text text_type_main-default secondary">{item.carbohydrates}</p>
                            </span>
                        </div>
                        
                    </span>
                    </div>
                ):(
                    <h1>Загрузка</h1>
                )
            }
            </main>
        </div>
        
        </>
    )
}
