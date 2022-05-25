import PropTypes from 'prop-types'
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from 'react-redux';

import Reorder, {
    reorder,
    reorderImmutable,
    reorderFromTo,
    reorderFromToImmutable
  } from "react-reorder";
import move from "lodash-move";

import { v4 as uuidv4 } from 'uuid';

import { DECREASE_LIST_ITEM, INCREASE_LIST_ITEM, CHANGE_LIST } from '../../services/actions/components'

import { sendOrder } from '../../services/actions/index.js';

import { useDrop} from 'react-dnd'

import dataPropTypes from '../../utils/type.js'

import style from './style.module.css'


function BurgerConstructor() {

    const createOrder = () =>{
        return dispatch(sendOrder(listIngredients))
    }

    const dispatch = useDispatch() 

    const removeItem = (itemId) => dispatch({type: DECREASE_LIST_ITEM, id: itemId})
    const chngeList = (newList) => dispatch({type: CHANGE_LIST, items: newList})

    const listIngredients = useSelector(store=>store.components.list)

    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => {
          console.log(item);
          dispatch({type:INCREASE_LIST_ITEM, items:{...item, uuid: uuidv4()} })
        },
      }), [])

    return(
        <div className={"mt-20"} >

            <div ref={drop}>
                {   listIngredients &&
                    <BurgerConstructorList list={listIngredients} fnReorder={chngeList} fnRemove={removeItem} />
                }
            </div>
            

            <div className={style.form_pay + " mt-10"}>

                <p className={"text text_type_digits-medium "+style.margin_height_auto}>
                    {TotalPrice(listIngredients)}
                </p>

                <div className={style.margin_height_auto }>
                    <CurrencyIcon type="primary" className={style.icon_pay} />
                </div>
                
                <div className="ml-10">
                    <Button
                        onClick={createOrder}
                        className='ml-10'
                        type="primary" 
                        size="large"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    )
}

function TotalPrice(list){
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

TotalPrice.propTypes= {
    list: PropTypes.arrayOf(dataPropTypes)
}

function BurgerConstructorList({list, fnRemove, fnReorder}){

    const list_ingridients = list.filter( firstData => firstData.type !== "bun" )
    const bun = list.filter( firstData => firstData.type === "bun" )[0]

    const onReorder = (e, from, to) => {
        fnReorder([bun, ...move(list_ingridients, from, to)])
      };

    try{
        const onReorder = (e, from, to) => {
            fnReorder([bun, ...move(list_ingridients, from, to)])
          };
        
        return(
            <span >
                <div className='ml-6 mb-2'>
                    <ConstructorElement
                        className='ml-8'
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
                    .map((x)=>{
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
        const onReorder = (e, from, to) => {
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
                    .map((x)=>{
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

BurgerConstructorList.propTypes = {
    list: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;