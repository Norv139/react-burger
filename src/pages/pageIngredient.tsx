import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { path, url } from '../utils/settings';

import { TdataPropTypes, NulldataPropTypes } from '../utils/type/type';

import style from './styles.module.css'
import styleIngredient from './styleIngredient.module.css'
import { useAppDispatch, useAppSelector } from '../services/utils/hooks';
import { getAllItems } from '../services/action/getAllItems';


const axios = require('axios').default;

interface IResponse extends Response{
    data: {
        data: TdataPropTypes[]
    }
}

export const PageIngredient: React.FC = () =>  {  

    const dispatch = useAppDispatch()
    const [allItem, setAllItem] = useState<TdataPropTypes>(NulldataPropTypes)
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const items = useAppSelector((state)=>state.components.items)


    useEffect( ()=>{
        if (items.length == 0){
            dispatch(getAllItems())
            setAllItem(items.filter(x=>x._id == id)[0])
        }
        else{
            setAllItem(items.filter(x=>x._id == id)[0])
        }
        },[setAllItem, axios, id]
    )

    const data = allItem
    
    return(
        <div className={style.over}>
            <main className={style.box}>
                <div className={styleIngredient.modal}>
                    <p className="text text_type_main-medium ml-10"> Детали ингидиета </p>
                    <span className={styleIngredient.model_content + ' pt-10 pl-10 pr-10 pb-15'}>
                        
                        <img src={data.image_large} alt='img'/>

                        <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>

                        <div className={styleIngredient.model_info}>
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
            </main>
        </div>
    )
}
