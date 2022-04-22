import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import './style.css'

function BurgerConstructor(props) {
    return(
        <div className="main-block mr-10">

            <p className=" text text_type_main-large mt-10 mb-5">
                Собери бургер
            </p>

            <div style={{ display: 'flex' }} className="">
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

            <div className='all-content'>

                <p className="title text text_type_main-medium mt-10" id='bun'>
                    Булки
                </p>
                <SortCards data={props.data} filterName="bun" />

                <p className="title text text_type_main-medium" id='sauce'>
                    Соусы
                </p>
                <SortCards data={props.data} filterName="sauce" />

                <p className="title text text_type_main-medium" id='main'>
                    Начинка
                </p>
                <SortCards data={props.data} filterName="main" />

            </div>

        </div>
    )
}



function Сard(props){
    return(
        <div className='card-frame mt-6 mb-10 ml-4 mr-2'>
            
            <div className='ml-4 mr-4'>
                <img src={props.data.image} alt={props.data.name} />
            </div>
            

            <div className='card-info'>
                <div className="price mt-1 mb-1">
                    <p className="text text_type_digits-default">
                        {props.data.price} 
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                    {props.data.name}
                </p>
            </div>
        </div>
    )
}

function SortCards(props){
    return(
        <div className='content'>
            {
                props.data
                .filter( firstData => firstData.type === props.filterName )
                .map( renderData => {return( <Сard key={renderData._id} data={renderData} /> ) } )
            }
        </div>
    )
}


export default BurgerConstructor;
