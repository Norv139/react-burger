
import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'

export function Profile(){

    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const [icon, setIcon] = useState(true);


    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    return(
        <div className={style.over}>
            <div className={style.box}>
                <span className='mr-15'>
                    <p className={style.p_text + " text text_type_main-medium"}>
                        Профиль
                    </p>
                    <p className={style.p_text + " text text_type_main-medium text_color_inactive"}>
                        История заказов
                    </p>
                    <p className={style.p_text + " text text_type_main-medium text_color_inactive"}>
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
                        type='name'
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
            </div>
        </div>
    )
}
