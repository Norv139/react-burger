import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import './style.css'


function BurgerIngredients(props) {

    return(
        <div className="mr-10">

            <BurgerIngredientsList list={props.dataList} />

            <div className="form-pay mt-10">

                <p className="text text_type_digits-medium margin-height-auto">
                    {TotalPrice(props.dataList)}
                </p>
                <div className="margin-height-auto">
                    <CurrencyIcon type="primary" className='icon-pay' />
                </div>
                <div className="ml-10">
                    <Button
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

    const bun = list.filter( firstData => firstData.type === "bun" )[0].price

    const initialValue = 0;
    const sumWithInitial = list
        .map(x=>x.price)
        .reduce( 
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue);
    return sumWithInitial + bun * 2
}

function BurgerIngredientsList(props){
    const bun = props.list.filter( firstData => firstData.type === "bun" )[0]

    return(
        <div className="list">
            <div className='ml-6 mt-25 mb-4'>
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
                    props.list
                    .map((x, index)=>{
                        return(
                            <div key={index} className='item mb-4'>
                                <div className="margin-height-auto">
                                    <DragIcon type="primary"/>
                                </div>
                                <ConstructorElement
                                    text={x.name}
                                    price={x.price}
                                    thumbnail={x.image} 
                                />
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
        </div>
    )
}

export default BurgerIngredients;