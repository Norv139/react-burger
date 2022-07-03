import { useState } from 'react';

import { BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'
import { useHistory, useLocation } from 'react-router-dom';



interface IInitValue{
    constructor: boolean;
    orderFeed: boolean;
    cabinet: boolean;
}

function AppHeader(){


    const initValue:IInitValue = { 
        constructor: false, orderFeed: false, cabinet: false
    }

    const [objButton, setObjButton] = useState(initValue)

    const history = useHistory();
    const location = useLocation();

    
    const boolType = (anyBool:boolean) => {return anyBool ? "primary" : "secondary"}

    return(
        <header className={style.navigation_panel}>

                    <div className={style.conteiner}>
                        <CastomButton 
                            type={boolType(objButton.constructor)}
                            icon={
                                <BurgerIcon type={boolType(objButton.constructor)} />
                            } 
                            text="Конструктор"
                            onClickBnt={
                                ()=>{
                                    setObjButton({...initValue, constructor: true})
                                    history.push({ pathname: "/", state: { from: location } })
                                }
                            }
                            
                        />
                        <CastomButton 
                            type={boolType(objButton.orderFeed)}
                            icon={
                                <ListIcon type={boolType(objButton.orderFeed)} />
                            } 
                            text="Лента заказов" 
                            onClickBnt={
                                ()=>{
                                    setObjButton({...initValue, orderFeed: true})
                                    history.push({ pathname: "/profile/orders", state: { from: location } })
                                }
                            }
                        />
                    </div>

                    <div className={style.conteiner + ' ' + style.mainLogo}>
                        <Logo  />
                    </div>

                    <div className={style.conteiner}></div>
                    
                    <div className={style.conteiner}>
                    
                        <CastomButton 
                            type={boolType(objButton.cabinet)}
                            icon={
                                <ProfileIcon type={boolType(objButton.cabinet)} />
                            } 
                            text="Личный кабинет"
                            onClickBnt={
                                ()=>{
                                    setObjButton({...initValue, cabinet: true})
                                    history.push({ pathname: "/profile", state: { from: location } })
                                }
                            }
                        />
                    </div>
                    
                
        </header>
    )
}




interface ICastomButton{
    onClickBnt: ()=>void;
    icon: any;
    type: string; 
    text: string
}

function CastomButton({onClickBnt, icon, type, text}:ICastomButton){
    return(
    <div 
        className='mt-4 mb-4 pl-5 pr-5'
    >
        <div className={style.conteiner} onClick={onClickBnt}>

            <div className='pt-4 pb-4'>
                {icon}
            </div>
            
            <p className={' pl-2 pt-4 pb-4 text text_type_main-default ' + style[type]}>
                {text}
            </p>                    
        </div>
    </div>
    )
}


export default AppHeader;