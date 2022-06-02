import PropTypes from 'prop-types';

import { BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'

function AppHeader(){
    const primary = style.primary
    const secondary = style.secondary

    return(
        <header className={style.navigation_panel}>


                    <div className={style.conteiner}>
                        <CastomButton 
                            type={primary}
                            icon={
                                <BurgerIcon type="primary" />
                            } 
                            text="Конструктор"
                        />
                        <CastomButton 
                            type={secondary} 
                            icon={
                                <ListIcon type="secondary" />
                            } 
                            text="Лента заказов" 
                        />
                    </div>

                    <div className={style.conteiner + ' ' + style.mainLogo}>
                        <Logo  />
                    </div>

                    <div className={style.conteiner}></div>
                    
                    <div className={style.conteiner}>
                    
                        <CastomButton 
                            type={secondary}  
                            icon={
                            <ProfileIcon type="secondary" />
                            } 
                            text="Личный кабинет" 
                        />
                    </div>
                    
                
        </header>
    )
}

function CastomButton({onClickBnt, icon, type, text}){
    return(
    <div className='mt-4 mb-4 pl-5 pr-5'>
        <div className={style.conteiner} type="secondary" onClick={onClickBnt}>

            <div className='pt-4 pb-4'>
                {icon}
            </div>
            
            <p className={' pl-2 pt-4 pb-4 text text_type_main-default ' + type}>
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