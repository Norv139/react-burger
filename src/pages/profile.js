
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'

export function Profile(){  

    const initValue = {
        profile: "text_color_inactive",
        orders: "text_color_inactive",
        logout: "text_color_inactive"
    }

    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const [select, setSelect] = useState(initValue);


    const onChange =  e => {
            e.preventDefault()
            setValue({ ...form, [e.target.name]: e.target.value });
        }
    
    

    return(
        <div className={style.over}>
            <main className={style.box}>
                <span className='mr-15'>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + select.profile}
                    >
                        Профиль
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + select.orders}
                    >
                        История заказов
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + select.logout}
                    >
                        Выход
                    </p>

                    <div className='mt-20' />

                    <p className={style.p_text + " text text_type_main-default text_color_inactive"}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>

                </span>

                <form className={style.main}>
                    <Input 
                        placeholder={'Имя'}
                        type='text'
                        name='name'
                        icon={'EditIcon'}
                        value={form.name} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    <Input 
                        placeholder={'E-mail'}
                        type='email'
                        name='email'
                        icon={'EditIcon'}
                        value={form.email} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    <Input 
                        placeholder={'Пароль'} 
                        type='password'
                        name='password'
                        icon={'EditIcon'}
                        value={form.password}
                        onChange={onChange}
                    />
                </form>
            </main>
        </div>
    )
}
