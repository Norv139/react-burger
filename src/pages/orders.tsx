import React, {FC, useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllItems, logoutUser } from "../services/actions"
import { TwsOrder, wsClose, wsStart } from "../services/reducers/ws"
import { TRootState } from "../services/store"

import { wsUrl } from "../utils/settings"
import { getCookie } from "../services/utils/cookie"
import { FeedLent } from "./feedLent"
import { CardFeed } from "../components/CardFeed/CardFeed"

import styles from "./styles.module.css"
import style from './styles.module.css'
import { useHistory, useLocation } from "react-router-dom"
import { setLogin } from "../services/reducers/user"
import { openInfo, setInfo } from "../services/reducers/detals"

export const Orders: FC = () => {

    const initValueType = {
        profile: "text_color_inactive",
        orders: "text_color_inactive",
        logout: "text_color_inactive"
    };

    const history = useHistory()
    const location = useLocation();

    const [select, setSelect] = useState(initValueType);

    const dispatch = useDispatch()
    const dataIngredients = useSelector((state:TRootState)=>state.components.items)
    const accessToken = getCookie('accessToken')?.substring(7)

    const feed = useSelector((state:TRootState)=>state.ws.feed)

    useEffect(() => {
      
      dispatch(wsStart(`${wsUrl}?token=${accessToken}`))
        if (dataIngredients.length === 0){
            dispatch(getAllItems()  as any)
        }
      return ()=>{
        dispatch(wsClose('null'))}
    }, []);

    const openDetals = (data) => { 
        
        history.push({ pathname: `/profile/orders/${data._id}`, state: { from: location } })

        dispatch(setInfo({item:data}));
        dispatch(openInfo()); 
    }
    
    if (!feed.orders){
        history.push({pathname: '/', state: { from: location } });
    }


    return (
    <main className={`${style.box} mt-10`}>
        
        <span className='mr-15 mt-10'>

            <p 
                className={style.p_text + " text text_type_main-medium " + select.profile}
                onClick={()=>{history.push({pathname: '/profile', state: { from: location } })}}
            >
                Профиль
            </p>

            <p 
                className={style.p_text + " text text_type_main-medium "}
                
            >
                История заказов
            </p>

            <p 
                className={style.p_text + " text text_type_main-medium " + select.logout}
                onClick={()=>{ 
                    dispatch(setLogin(false)); 
                    logoutUser(); 
                    history.push({pathname: '/', state: { from: location } });
                }}
            >
                Выход
            </p>

            <div className='mt-20' />

            <p className={style.p_text + " text text_type_main-default text_color_inactive"}>
                В этом разделе вы можете
                изменить свои персональные данные
            </p>

        </span>

        <div className={styles.all_content}>
        {   feed.total !== 0?(

                feed.orders.map( 
                    (order: TwsOrder, i )=> 
                    <CardFeed 
                        type={'feed'} 
                        openModal={openDetals}
                        order={order} 
                        key={i.toString()} 
                        eKey={i.toString()}
                    /> 
                )
            ):(
                <>L</>
            )
        }
        </div>
 
    </main>
    )
}