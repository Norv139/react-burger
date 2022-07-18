import React, {FC, useEffect, useState} from "react"

import { TwsOrder, wsClose, wsStart } from "../services/reducers/ws"

import { path, url, wsUrl } from "../utils/settings"
import { getCookie } from "../services/utils/cookie"
import { CardFeed } from "../components/CardFeed/CardFeed"

import styles from "./styles.module.css"
import style from './styles.module.css'
import { useHistory, useLocation } from "react-router-dom"
import { setLogin } from "../services/reducers/user"
import { closeInfo, closeOrder, openInfo, setInfo } from "../services/reducers/detals"
import Modal from "../components/Modal/Modal"
import { Order } from "./order"
import { useAppDispatch, useAppSelector } from "../services/utils/hooks"
import { getItems_FAILED, getItems_REQUEST, getItems_SUCCESS } from "../services/reducers/components"
import { logoutUser } from "../utils/logoutUser"

export const Orders: FC = () => {

    const initValueType = {
        profile: "text_color_inactive",
        orders: "text_color_inactive",
        logout: "text_color_inactive"
    };

    const history = useHistory()
    const location = useLocation();

    const [select, setSelect] = useState(initValueType);

    const dispatch = useAppDispatch()

    const isLogin = useAppSelector(state=>state.user.isLogin)

    const dataIngredients = useAppSelector((state)=>state.components.items)
    const isOpenInfo = useAppSelector((state)=>state.detals.isOpenInfo)
    const feed = useAppSelector((state)=>state.ws.feed)

    const accessToken = getCookie('accessToken')?.substring(7)

    const axios = require('axios').default;

    const getAllItems = () => {
        if(!isLogin){
            history.push({ pathname: `/login`, state: { from: location } })
        }
        dispatch(getItems_REQUEST())

        axios.get(`${url}${path}`)
        .then( (response) => {
            dispatch(
                getItems_SUCCESS(
                    {items: response.data.data}
                )
            );
        })
        .catch( (error) => {
            dispatch(
                getItems_FAILED()
            );
            console.log(error);
        })
    }


    useEffect(() => {

      dispatch(wsStart(`${wsUrl}?token=${accessToken}`))
        if (dataIngredients.length === 0){
            getAllItems()
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
    

    return ( <>
    { location.pathname == '/profile/orders' || isOpenInfo?
        (
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
        ):(
            <div className="mt-10">
            <Order/>
            </div>
        )
    }
    {
        isOpenInfo &&
            <Modal onClose={
                ()=>{
                    dispatch(closeOrder());
                    dispatch(closeInfo());
                    history.push({pathname: '/profile/orders', state: { from: location } })
                    }
                }>
                <Order />
            </Modal>

    }
    </>
    

    )
}