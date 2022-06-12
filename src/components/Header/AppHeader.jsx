import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'
import { useRedirect } from '../../services/utils';


function AppHeader(){

    const pathURL = useSelector(state=>state.user.previousPath)

    const initValue = { 
        constructor: false, orderFeed: false, cabinet: false
    }

    const [objButton, setObjButton] = useState(initValue)
    const redirect = useRedirect()
    const boolType = (anyBool) => {return anyBool ? "primary" : "secondary"}

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
                                    redirect('/')
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
                                    redirect('/profile/orders')
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
                                    redirect('/profile')
                                }
                            }
                        />
                    </div>
                    
                
        </header>
    )
}

function CastomButton({onClickBnt, icon, type, text}){
    return(
    <div 
        className='mt-4 mb-4 pl-5 pr-5'
    >
        <div className={style.conteiner} type="secondary" onClick={onClickBnt}>

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

PropTypes.CastomButton = {
    onClickBnt: PropTypes.func, 
    icon: PropTypes.object, 
    type: PropTypes.string, 
    text: PropTypes.string
}

export default AppHeader;