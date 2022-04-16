import {Tab} from '@ya'
import React from 'react'; 

import './style.scss'

function AppHeader(){
    return(
        <div className='navigation-panel'>

            <div className='container'>
                <NavigationBlock img='' text='LOL' class='light' />
                <NavigationBlock img='' text='LOL' class='light' />
            </div>

            <div className='container'>
                <Tab />
            </div>
            

            <div className='container'>
                <NavigationBlock img='' text='LOL' class='gray' />
                <NavigationBlock img='' text='LOL' class='gray' />
            </div>

        </div>
    )
}

function NavigationBlock(props){
    return(
        <div className={'navigation-block ' + props.class} >
            <img src={props.img} />
            <p>{props.text}</p>
        </div>
    )
}

export default AppHeader;