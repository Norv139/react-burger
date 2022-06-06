import { useEffect, useLayoutEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getAllItems } from '../services/actions/index.js';

import { path, url } from '../utils/settings.js';


import style from './style.module.css'

import styleIngredient from './styleIngredient.module.css'

const axios = require('axios').default;


export function PageIngredient(){  
    const [allItem, setAllItem] = useState({});
    const location = useLocation();
    const id = location.pathname.split('/').pop();

    useEffect( ()=>{
            axios.get(`${url}${path}`)
            .then( (response) => {
                console.log(response.data.data)
                setAllItem(response.data.data.filter(x=>x._id == id)[0])
            })
            .catch( (error) => {
                console.log(error);
            })
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
