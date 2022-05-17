import PropTypes from 'prop-types'
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from 'react-redux';
import { OPEN_ORDER } from '../../services/actions/detals.js';

import { INCREASE_LIST_ITEM, DECREASE_LIST_ITEM } from '../../services/actions/components.js';

import { useDrop } from 'react-dnd'

import dataPropTypes from '../../utils/type.js'

import style from './style.module.css'



function BurgerConstructor() {
    const dispatch = useDispatch() 

    const listIngredients = useSelector(store=>store.components.list)
    const openDetails = () => {
        dispatch({type:OPEN_ORDER})
    }

    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => {
          console.log(item);
          dispatch({type:INCREASE_LIST_ITEM, items:{...item} })
        },
      }), [])

    return(
        <div className={"mt-20"} >

            <div ref={drop}>
                {   listIngredients &&
                    <BurgerConstructorList list={listIngredients} />
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
                        onClick={openDetails}
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
    try {
        const bun = list.filter( firstData => firstData.type === "bun" )[0].price

        const initialValue = 0;
        const sumWithInitial = list
            .filter( firstData => firstData.type !== "bun" )
            .map(x=>x.price)
            .reduce( 
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue);
        return sumWithInitial + bun * 2
    } catch {
        return 0
    }
}

TotalPrice.propTypes= {
    list: PropTypes.arrayOf(dataPropTypes)
}

function BurgerConstructorList({list}){
    try{
        const bun = list.filter( firstData => firstData.type === "bun" )[0]
        return(
            <span>
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
                <div className={style.all_list}>   
                {
                    list
                    .filter( firstData => firstData.type !== "bun" )
                    .map((x, index)=>{
                        return(
                            <div key={index} className={style.item + " mt-2 mb-2"}>
                                <div className={style.margin_height_auto}>
                                    <DragIcon type="primary"/>
                                </div>

                                <ConstructorElement
                                    text={x.name}
                                    price={x.price}
                                    thumbnail={x.image}
                                    handleClose={()=>{console.log('LAL', x._id)}}
                                />

                            </div>
                            )
                    })
                }
                </div>  
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
        return (
            <div className={style.all_list}> 
            </div>
        )
    }
}

BurgerConstructorList.propTypes = {
    list: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;