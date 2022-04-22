import { BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'

import './style.scss'

function AppHeader(props){
    return(
        <div className='navigation-panel'>


                    <div className="conteiner">
                        <CastomButton 
                            type="primary" 
                            icon={<BurgerIcon type="primary" />} 
                            text="Конструктор"
                        />
                        <CastomButton 
                            type="secondary" 
                            icon={<ListIcon type="secondary" />} 
                            text="Лента заказов" 
                        />
                    </div>

                    <div className="conteiner mainLogo">
                        <Logo  />
                    </div>

                    <div className="conteiner "></div>
                    
                    <div className="conteiner ">
                    
                        <CastomButton 
                            type="secondary" 
                            icon={<ProfileIcon 
                            type="secondary" />} 
                            text="Личный кабинет" 
                        />
                    </div>
                    
                
        </div>
    )
}

function CastomButton(props){
    return(
    <div className='mt-4 mb-4 pl-5 pr-5'>
        <div className='conteiner ' type="secondary" onClick={props.onClick}>
            <div className='pt-4 pb-4'>
                {props.icon}
            </div>
            <p className={' pl-2 pt-4 pb-4 text text_type_main-default '+props.type}>
                {props.text}
            </p>                    
        </div>
    </div>
    )

}
//p className="text text_type_main-default"
export default AppHeader;