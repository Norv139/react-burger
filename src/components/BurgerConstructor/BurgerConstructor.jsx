import PropTypes from 'prop-types'
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import dataPropTypes from '../../utils/type.js'

import style from './style.module.css'

function BurgerConstructor({listIngredients, openDetails}) {

    return(
        <div className={"mt-20"} >

            <div className={style.all_list}>
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

BurgerConstructor.propTypes = {
    listIngredients: PropTypes.arrayOf(dataPropTypes).isRequired,
    openDetails: PropTypes.func.isRequired
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
    list: PropTypes.arrayOf(dataPropTypes).isRequired
}

function BurgerConstructorList({list}){
    try{
        const bun = list.filter( firstData => firstData.type === "bun" )[0]
        return(
            <span>
                <div className='ml-6 mb-4'>
                    <ConstructorElement
                        className='ml-8'
                        type="top"
                        isLocked={true}
                        text={bun.name + '(верх)'}
                        price={bun.price}
                        thumbnail={bun.image} 
                    />
                </div>        
                {
                    list
                    .filter( firstData => firstData.type !== "bun" )
                    .map((x, index)=>{
                        return(
                            <div key={index} className={style.item + " mb-4"}>
                                <div className={style.margin_height_auto}>
                                    <DragIcon type="primary"/>
                                </div>
                                <ConstructorElement
                                    text={x.name}
                                    price={x.price}
                                    thumbnail={x.image} />
                            </div>
                            )
                    })
                }
                <div className='ml-6'>
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
        return null
    }
}

BurgerConstructorList.propTypes = {
    list: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;