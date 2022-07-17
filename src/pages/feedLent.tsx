import React, {FC, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { wsClose, wsStart } from "../services/reducers/ws"
import { TRootState } from "../services/store"
import { orders, wsUrl } from "../utils/settings"
import { CardFeed } from "../components/CardFeed/CardFeed"

import { TwsOrder } from "../services/reducers/ws"
import { useHistory, useLocation } from "react-router-dom"
import { closeInfo, closeOrder, openInfo, setInfo } from "../services/reducers/detals"
import Modal from "../components/Modal/Modal"
import { Order } from "./order"
import { useAppDispatch, useAppSelector } from "../services/utils/hooks"

import styles from "./styles.module.css"

export const FeedLent = () => {

    const history = useHistory();
    const location = useLocation();

    const dispatch = useAppDispatch()

    const isOpenInfo = useAppSelector((store)=>store.detals.isOpenInfo)
    const feed = useAppSelector((state)=>state.ws.feed)

    useEffect(() => {
      dispatch(wsStart(`${wsUrl}/all`))
      return ()=>{
        dispatch(wsClose('null'))}
    }, []);

    const openDetals = (data) => { 
        
        history.push({ pathname: `/feed/${data._id}`, state: { from: location } })

        dispatch(setInfo({item:data}));
        dispatch(openInfo()); 
    }

    if (!feed.orders){
        history.push({pathname: '/', state: { from: location } });
    }
    
    

    return ( 
    <>
        {feed.orders?
            (
            <>
                { 
                    feed.orders.length > 1 ?(
                    <main>
                        <div>
                            <h2 className='text text_type_main-large mb-5 mt-8'>Лента заказов</h2>
                            <div className={styles.all_content}>

                                {
                                    feed.orders.map( 
                                        (order: TwsOrder, i)=> 
                                        <CardFeed 
                                            openModal={openDetals}
                                            type={'feed'} 
                                            order={order} 
                                            key={i.toString()} 
                                            eKey={i.toString()}
                                        /> 
                                        )
                                }

                            </div>
                        </div>

                        <div className=" ml-15">
                        <div className={`${styles.main_conteiner} mt-10`}>
                            <div>
                                <h3 className='text text_type_main-medium mr-9'>Готовы:</h3>
                                <div className={`${styles.stats_list_ready} ${styles.stats_list} mt-6`}>
                                    {
                                        feed.orders.map(
                                            (order: TwsOrder, i)=>order.status ==="done" && 
                                            <p className={ `${styles.stats_list_ready} text text_type_digits-default mb-2`} key={i}>
                                                {order.number}
                                            </p>
                                        )
                                    }
                                </div>
                                
                            </div>

                            <div>
                                <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                                <div>
                                {
                                    feed.orders.map(
                                        (order: TwsOrder, i)=>order.status ==="pending" && 
                                        <p className={ `${styles.stats_list_ready} text text_type_digits-default`} key={i}>
                                            {order.number}
                                        </p>
                                    )
                                }
                                </div>
                            </div>
                            </div>

                            <div>
                                <h3 className='text text_type_main-medium mt-10'>Выполнено за все время:</h3>
                                {feed.orders.length > 0 && (
                                    <h1 className={`${styles.stats_count} text text_type_digits-large`}>{feed.total}</h1>
                                )}
                            </div>

                            <div>
                                <h3 className='text text_type_main-medium mt-10'>Выполнено за сегодня:</h3>
                                {feed.orders.length > 0 && (
                                <h1 className={`${styles.stats_count} text text_type_digits-large`}>{feed.totalToday}</h1>
                                )}
                            </div>
                        </div>

                        
                    </main>
                    ):(
                        <h1 className={`${styles.order_loading} text text_type_main-large text_color_inactive`}>Загрузка...</h1>
                    )
                }
            </>
            ):(
                <h1 className={`${styles.order_loading} text text_type_main-large text_color_inactive`}>Ошибка?</h1>
            )
        }
        {isOpenInfo?
            (<Modal onClose={
                ()=>{
                    dispatch(closeOrder());
                    dispatch(closeInfo());
                    history.goBack()
                    }
                }>
                <Order />
            </Modal>)
            :
            (<></>)
        }
    </>
    )
}