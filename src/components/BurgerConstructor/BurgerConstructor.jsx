import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './style.module.css'

const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.string.isRequired,
    carbohydrates:PropTypes.number.isRequired,
    calories:PropTypes.number.isRequired,
    price:PropTypes.number.isRequired,
    image:PropTypes.string.isRequired,
    image_mobile:PropTypes.string.isRequired,
    image_large:PropTypes.string.isRequired,
    __v:PropTypes.number,
  });

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

PropTypes.BurgerConstructor = {
    listIngredients: PropTypes.arrayOf(dataPropTypes.isRequired),
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

PropTypes.TotalPrice = {
    list: PropTypes.arrayOf(dataPropTypes)
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

PropTypes.BurgerConstructorList = {
    list: PropTypes.arrayOf(dataPropTypes)
}

export default BurgerConstructor;