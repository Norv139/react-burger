import React, { useEffect } from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TRootState } from "../../services/store"

import { v4 as uuidv4 } from 'uuid';

import { getAllItems } from "../../services/actions"
import { formatDate } from "../../services/utils/formatDate"

import { TwsOrder } from "../../services/reducers/ws"
import { TdataPropTypes } from "../../utils/type/type"

import styles from "./style.module.css"

declare module 'react' {
    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>): ReactElement<any, any> | null;
    }
  }

export const CardFeed:FC<{order:TwsOrder, type: string, eKey:string, openModal}> = ({order, eKey, type, openModal}) =>{

    const dispatch = useDispatch()

    const allIngridients = useSelector((state: TRootState)=>state.components.items)
//    const feed = useSelector((state: TRootState)=>state.ws.feed)

    

    const getIingredients = (serch:Array<string>)=>{
        return allIngridients.length > 0 ? (
                allIngridients.filter(item => serch.includes(item._id))
                //serch.map(x=>allIngridients.find(ing=>ing._id == x))
            ):(
                []
            )
    }

    const getTotalPrice = (list) =>{
        const initialValue = 0;
        return list.map(x=>x.price).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
          )
    }

    useEffect(()=>{
        if(allIngridients.length===0){
            dispatch(getAllItems()  as any)
        }

    },[getIingredients])

    return(
        <div key={eKey} onClick={()=>{openModal(order)}}>
            <div className={`${styles.main_frame} mb-6 mr-2`}>
                <div className={`${styles.frame_status} mb-6`}>
                    <h2 className={`text text_type_digits-default mb-6`}>#{order.number}</h2>
                    <p className={` text text_type_main-default`}>{formatDate(new Date(order.createdAt))}</p>
                </div>
                <h1 className="text text_type_main-medium mb-6">{order.name}</h1>

                <div className={`${styles.frame_info}`}>

                    <div className={`pt-2 pb-2`} > 

                    <ListIingredients orderIngredients={getIingredients(order.ingredients)} />

                    </div>

                    <div className={styles.frame_info}>
                        <h2 className="text text_type_digits-default">{getTotalPrice(getIingredients(order.ingredients))}</h2>
                        <CurrencyIcon type="primary"/>
                    </div>

                </div>
            </div>
        </div>
    )

}
//

const ListIingredients =({orderIngredients})=>{
    return(
        <div className={styles.list_ingredient}>{ orderIngredients.map(
            (ingredient, i)=>(
            <div key={uuidv4()} className={`${styles.list_ingredient_container}`} style={{transform: `translate(${-23 * i }px, 0)`}}>
                <div className={`${styles.list_ingredient_icon}` }>
                    <img 
                    src={ingredient.image_mobile} 
                    className={`${styles.list_ingredient_img}`} 
                    alt="ingredient_image" 
                    />
                </div>
            </div>
        
          ))
          }
        </div>
    )
}
