import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TRootState } from "../services/store";

import { v4 as uuidv4 } from 'uuid';
import { formatDate } from "../services/utils/formatDate";

import styles from "./styles.module.css"
import { wsClose, wsStart } from "../services/reducers/ws";
import { wsUrl } from "../utils/settings";
import { getAllItems } from "../services/actions";

export const Order: FC = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const id = location.pathname.split('/').pop();

    const allIngridients = useSelector((state: TRootState)=>state.components.items)
    const orders = useSelector((state:TRootState)=>state.ws.feed.orders)
    const order = orders.find(x=>x._id === id)

    useEffect(() => {
        dispatch(getAllItems()  as any)
        dispatch(wsStart(`${wsUrl}/all`))
        return ()=>{
          dispatch(wsClose('null'))}
      }, []);

    const getStatus = (status: string | undefined):string =>{
        switch (status) {
            case 'done': {
              return 'Выполнен';
            }
            case 'pending': {
              return 'Готовится';
            }
            default: {
              return 'Создан';
            }
        }
    }

    const getTotalPrice = (list) =>{
        const initialValue = 0;
        return list.map(x=>x.price).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
          )
    }

    const getIingredients = (serch:Array<string>|undefined)=>{
        return serch && allIngridients.length > 0 ? (
                allIngridients.filter(item => serch.includes(item._id))
                //serch.map(x=>allIngridients.find(ing=>ing._id == x))
            ):(
                []
            )
    }

    const orderIngridient = getIingredients(order?.ingredients)

    return (        
    <div className={styles.main_frame}>

        <h1 className={`text text_type_digits-medium mb-10 ${styles.center}`}>#{order?.number}</h1>

        <div className={styles.j}>
            <h1 className="text text_type_main-medium mb-3">{order?.name}</h1>
            <p className={`${order?.status === 'done' ? styles.order_ready : styles.order__status} text text_type_main-default mb-15`}>{getStatus(order?.status)}</p>
        </div>
        <h1 className={`${styles.j} text text_type_main-medium mb-6`}>Состав:</h1>
        
        { orderIngridient.map( storeIngredient =>
            <div className={`${styles.frame_status} mb-4`} key={uuidv4()}>
            <div className={styles.frame_status}>
                <div className={`${styles.list_ingredient_container} mr-4`}>
                    <div className={styles.list_ingredient_icon}>

                    <img 
                        src={storeIngredient.image_mobile} 
                        className={styles.img}
                        alt="ingredient_image" 
                    />
                    </div>
                </div>
                <p className='text text_type_main-default'>{storeIngredient.name}</p>
            </div>

            <div className={styles.frame_status}>
                <h2 className="text text_type_digits-default">{} x </h2>
                <h2 className="text text_type_digits-default">{storeIngredient.price}</h2>
                <CurrencyIcon type="primary"/>
            </div>
            </div>)
        }
 
        <div className={styles.frame_info}>
            
            <p className='text text_type_digits-default'>
                {order?(formatDate(new Date(order.createdAt))):(null)}
            </p>

            <div className={styles.list_ingredient}>
                <h2 className='text text_type_digits-default'>
                    {(getTotalPrice(orderIngridient))}
                </h2>

                <CurrencyIcon type="primary"/>
            </div>
        </div>

    </div>
    )
}