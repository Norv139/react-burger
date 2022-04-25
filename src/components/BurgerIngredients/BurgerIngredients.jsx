import PropTypes from 'prop-types'
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import dataPropTypes from '../../utils/type.js'

import style from './style.module.css'



function BurgerIngredients({dataIngredients, openDetals}) {
    return(
        <div className={style.main_block + " mr-10"}>

            <p className=" text text_type_main-large mt-10 mb-5">
                Собери бургер
            </p>

            <div className={style.tab}>
                <Tab>
                    Булки
                </Tab>
                <Tab>
                    Соусы
                </Tab>
                <Tab>
                    Начинка
                </Tab>
            </div>

            { dataIngredients &&
            <div className={style.all_content}>

                <p className="title text text_type_main-medium mt-10" id='bun'>
                    Булки
                </p>

                <SortCards data={dataIngredients} filterName="bun" openDetals={openDetals} />

                <p className="title text text_type_main-medium" id='sauce'>
                    Соусы
                </p>

                <SortCards data={dataIngredients} filterName="sauce" openDetals={openDetals} />

                <p className="title text text_type_main-medium" id='main'>
                    Начинка
                </p>

                <SortCards data={dataIngredients} filterName="main" openDetals={openDetals} />

            </div>}

        </div>
    )
}

BurgerIngredients.propTypes = {
    dataIngredients: PropTypes.arrayOf(dataPropTypes.isRequired),
    openDetals: PropTypes.func
}

function SortCards({data, filterName, openDetals}){
    return(
        <div className={style.content}>
            {
                data
                .filter( firstData => firstData.type === filterName )
                .map( renderData => {return( <Сard key={renderData._id} data={renderData} openDetals={openDetals} /> ) } )
            }
        </div>
    )
}
SortCards.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    filterName: PropTypes.string.isRequired,
    openDetals: PropTypes.func
}

function Сard ({data, openDetals}) {
    return(
        <div className={style.card_frame + ' mt-6 mb-10 ml-4 mr-2'} onClick={()=>{openDetals(data)}}>
            
            <div className={ style.card_frame + ' ml-4 mr-4'}>
                <img src={data.image} alt={data.name} />
            </div>

            <div className={style.cart_info} >
                <div className={style.price+" mt-1 mb-1"}>
                    <p className="text text_type_digits-default">
                        {data.price} 
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default" >
                    {data.name}
                </p>
            </div>
        </div>
    )
}

Сard.propTypes ={
    data: PropTypes.object,
    openDetals: PropTypes.func
}



export default BurgerIngredients;
