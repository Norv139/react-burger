import { FC, useEffect } from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Reorder, {
    reorder,
    reorderImmutable,
    reorderFromTo,
    reorderFromToImmutable
} from "react-reorder";
import move from "lodash-move";
import { v4 as uuidv4 } from 'uuid';
import { useDrop} from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux';

import { 
    decrease_list_item, 
    increase_list_item, 
    change_list 
} from '../../services/reducers/components';
import { sendOrder } from '../../services/actions/index.js';
import { getCookie } from '../../services/utils';

import { TdataPropTypes } from '../../utils/type/type';

import style from './style.module.css';
import { useHistory, useLocation } from 'react-router-dom';

declare module 'react' {
    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>): ReactElement<any, any> | null;
    }
  }

interface IRootStore {
    components: {
        list: TdataPropTypes[];
    };
    user:{
        isLogin: boolean;
      }
}

const BurgerConstructor: FC = () => {
    
    const history = useHistory();
    const location = useLocation();
    // { pathname: "/login", state: { from: location } }
    const dispatch = useDispatch() 

    const isLogin = useSelector((store:IRootStore)=>store.user.isLogin)
    const listIngredients = useSelector((store:IRootStore)=>store.components.list)
    

    

    const createOrder = () =>{
        if(isLogin) {
            return dispatch( sendOrder(listIngredients) as any )
        }else{
            history.push({ pathname: "/login", state: { from: location } });
        }

    }
    const removeItem = (itemId: string) => dispatch(
        decrease_list_item({id: itemId})
    )
    const chngeList = (newList: TdataPropTypes[]) => dispatch(
        change_list({items: newList})
    )


    useEffect(()=>{
        
        if(isLogin && listIngredients.length!==0) {
            dispatch( sendOrder(listIngredients) as any )
        }
    }, []
    )
   
    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item: TdataPropTypes) => {
          
          dispatch(
            increase_list_item(
                    { items:{...item, uuid: uuidv4()} }
                )
          )
          
        },
      }), [])

    return(
        <div className={"mt-20"} ref={drop}>

            <div>
                {   listIngredients &&
                    <BurgerConstructorList list={listIngredients} fnReorder={chngeList} fnRemove={removeItem} />
                }
            </div>
            

            <div className={style.form_pay + " mt-10"}>

                <p className={"text text_type_digits-medium "+style.margin_height_auto}>
                    {TotalPrice(listIngredients)} <CurrencyIcon type="primary" />
                </p>

                
                <div className="ml-10">
                    <div className='pl-10'>
                        <Button
                            onClick={createOrder}
                            
                            type="primary" 
                            size="large"
                        >
                            Оформить заказ
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

function TotalPrice(list:TdataPropTypes[]){
    const initialValue = 0;

    try {
        const bun = list.filter( firstData => firstData.type === "bun" )[0].price

        const sumWithInitial = list
            .filter( firstData => firstData.type !== "bun" )
            .map(x=>x.price)
            .reduce( 
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue);
        return sumWithInitial + bun * 2
    } catch {
        const sumWithInitial = list
            .filter( firstData => firstData.type !== "bun" )
            .map(x=>x.price)
            .reduce( 
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue);
        return sumWithInitial
    }
}


interface IBurgerConstructorList{
    list: TdataPropTypes[],
    fnRemove: (IDitem:string)=>void,
    fnReorder: (list: TdataPropTypes[])=>any,
}

const BurgerConstructorList = ({list, fnRemove, fnReorder}:IBurgerConstructorList ) => {

    const list_ingridients = list.filter( firstData => firstData.type !== "bun" )
    const bun = list.filter( firstData => firstData.type === "bun" )[0]



    try{
        const onReorder = (e:any, from:number, to:number) => {
            fnReorder([bun, ...move(list_ingridients, from, to)])
          };
        
        return(
            <span >
                <div className='ml-6 mb-2'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + '(верх)'}
                        price={bun.price}
                        thumbnail={bun.image} 
                    />
                </div> 
                
                <Reorder
                    className={style.all_list}
                    reorderId="my-list" // Unique ID that is used internally to track this list (required)
                    reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
                    component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                    lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                    onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
                    autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                    
                    disableContextMenus={true}
                    
                    >
                {
                    list_ingridients
                    .map((x:TdataPropTypes)=>{
                        return(
                            <div key={x.uuid}  className={style.item + " mt-2 mb-2"} >
                                <div className={style.margin_height_auto}>
                                    <DragIcon type="primary"/>
                                </div>

                                <ConstructorElement
                                    text={x.name}
                                    price={x.price}
                                    thumbnail={x.image}
                                    handleClose={()=>{fnRemove(x._id)}}
                                />

                            </div>
                            )
                    })
                }
                </Reorder>
                  
                <div className='ml-6 mt-2'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name +'(низ)'}
                        price={bun.price}
                        thumbnail={bun.image} 
                    />
                </div>
            </span>
        )
    }
    catch{
        const onReorder = (e:any, from:number, to:number) => {
            fnReorder([...move(list_ingridients, from, to)])
          };
        return (
            
            <Reorder
                    className={style.all_list}
                    reorderId="my-list" // Unique ID that is used internally to track this list (required)
                    reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
                    component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                    lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                    onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
                    autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                    
                    disableContextMenus={true}
                    
                    >
                {
                    list_ingridients
                    .map((x:TdataPropTypes)=>{
                        return(
                            <div key={x.uuid}  className={style.item + " mt-2 mb-2"} >
                                <div className={style.margin_height_auto}>
                                    <DragIcon type="primary"/>
                                </div>

                                <ConstructorElement
                                    text={x.name}
                                    price={x.price}
                                    thumbnail={x.image}
                                    handleClose={()=>{fnRemove(x._id)}}
                                />

                            </div>
                            )
                    })
                }
                </Reorder>
        )
    }
}

export default BurgerConstructor;