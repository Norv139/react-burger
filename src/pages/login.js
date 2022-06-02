import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'

export function Login(){

    const [form, setValue] = useState({ email: '', password: '' });
    const [icon, setIcon] = useState(true);


    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    return(
        <div className={style.over}>
            <main className={style.main}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
                <form className={style.main}>
                    <Input 
                        placeholder={'E-mail'}
                        type='email'
                        name='email'
                        value={form.email} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    <Input 
                        placeholder={'Пароль'} 
                        type='password'
                        name='password'
                        icon={icon?'ShowIcon':'HideIcon'}
                        value={form.password}
                        onChange={onChange}
                        onIconClick={()=>{setIcon(!icon)}}
                    />
                    <div className='mt-6'/>
                    <Button 
                        type="primary" 
                        size="medium"
                        onClick={
                            e=>{
                                e.preventDefault(); 
                                console.log(form)
                            }
                        }
                    >
                        Вход
                    </Button>
                </form>
                
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    Вы — новый пользователь? <a className={style.link}>Зарегистрироваться</a>
                </p>
                <p className="text text_type_main-default mt-4 text_color_inactive">
                    Забыли пароль? <a className={style.link}>Восстановить пароль</a>
                </p>
            </main>
        </div>
    )
}