import { FC } from 'react'
import PropTypes from 'prop-types'
import { useRef, useEffect, useState } from 'react'
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

import { setInfo, openInfo } from '../../services/reducers/detals'


import { useDrag } from 'react-dnd'

import { getAllItems } from '../../services/actions/index';
import { TdataPropTypes } from '../../utils/type/type';

import style from './style.module.css'
import { useHistory, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../services/utils/hooks'
import { AnyAction } from 'redux'


declare module 'react' {
    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>): ReactElement<any, any> | null;
    }
  }




const BurgerIngredients: FC = () => {

    const [current, setCurrent] = useState('bun')

    const dispatch = useAppDispatch()
    const history = useHistory();
    const location = useLocation();

    const dataIngredients = useAppSelector((state)=>state.components.items)
    const listIngredients = useAppSelector((state)=>state.components.list)

    function fnCaunt(_id:string){
        return listIngredients.filter( (x: TdataPropTypes ) => {return x._id === _id}).length
    }
    
    const openDetals = (data:TdataPropTypes) => { 
        
        history.push({ pathname: `/ingredients/${data._id}`, state: { from: location } })

        dispatch(setInfo({item:data}));
        dispatch(openInfo()); 
    }

    const borderRef = useRef<HTMLDivElement>(null)
    const bunRef = useRef<HTMLParagraphElement>(null);
    const souseRef = useRef<HTMLParagraphElement>(null)

    const scrollHandler = (_: any) => {
        if(borderRef && borderRef.current && bunRef && bunRef.current && souseRef && souseRef.current) {
            
          
            const top = borderRef.current.getBoundingClientRect().top;
            const bun = bunRef.current.getBoundingClientRect().top -30;
            const souse = souseRef.current.getBoundingClientRect().top -30;

            setCurrent(
                bun   > 0 ? 'bun' : 
                souse  > -top ? 'souse' : 'main'
            );
        }

    };

    useEffect(() => {
      window.addEventListener("scroll", scrollHandler, true);

        dispatch(getAllItems())

      return () => {
        window.removeEventListener("scroll", scrollHandler, true);
      };
    }, []);


    return(
        <div className={style.main_block + " mr-10"}>

            <p className=" text text_type_main-large mt-10 mb-5">
                Собери бургер
            </p>

            <div className={style.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={()=>{}}>
                    Булки
                </Tab>

                <Tab value="souse" active={current === 'souse'} onClick={()=>{}}>
                    Соусы
                </Tab>

                <Tab value="main" active={current === 'main'} onClick={()=>{}}>
                    Начинка
                </Tab>
            </div>

            { dataIngredients &&
            <div className={style.all_content + '  mt-10'} ref={borderRef}>

                <p className="title text text_type_main-medium" id='bun' ref={bunRef}>
                    Булки
                </p>

                <SortCards 
                    data={dataIngredients} 
                    filterName="bun" 
                    openDetals={openDetals} 
                    fnCount={fnCaunt}
                    />

                <p className="title text text_type_main-medium" id='sauce' ref={souseRef}>
                    Соусы
                </p>

                <SortCards data={dataIngredients} filterName="sauce" openDetals={openDetals} fnCount={fnCaunt} />

                <p className="title text text_type_main-medium" id='main'>
                    Начинка
                </p>

                <SortCards data={dataIngredients} filterName="main" openDetals={openDetals} fnCount={fnCaunt} />

            </div>}

        </div>
    )
}

interface ISortCards{
    data:TdataPropTypes[];
    filterName: string;
    openDetals: (data:TdataPropTypes)=>void;
    fnCount: (any:string)=>number;
}

function SortCards({data, filterName, openDetals, fnCount}:ISortCards){
    
    return(
        <div className={style.content}>
            {
                data
                .filter( (firstData:  TdataPropTypes ) => firstData.type === filterName )
                .map( (renderData: TdataPropTypes) => 
                    { return(
                         
                    <Сard 
                        key={renderData._id} 
                        data={renderData} 
                        openDetals={openDetals} 
                        count={fnCount(renderData._id)}
                    /> 
                    ) } )
            }
        </div>
    )
}


interface ICart{
    data: any;
    openDetals: (data:TdataPropTypes)=>void;
    count: number;
}

function Сard ({data, openDetals, count}:ICart) {

    const [,drag] = useDrag(() => ({
        type: 'item',
        item: {...data},
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }), [data]
      )

    return(
        <div className={style.card_frame + ' mt-6 mb-10 ml-4 mr-2'} onClick={()=>{openDetals(data)}} >
            <div className={ style.card_frame + ' ml-4 mr-4'}>
                { count !== 0 ?(
                    <div className={style.counter_box}>
                        <Counter 
                            count={count} 
                            size="default" 
                        />
                    </div>
                    ):(
                    null
                )}

                <img src={data.image} alt={data.name} ref={drag} />


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
