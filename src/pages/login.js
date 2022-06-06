import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import { useDispatch } from 'react-redux';

import { useRedirect } from '../services/utils';


import style from './style.module.css'

import { postData } from '../services/actions/user';
import { userURL, login } from '../utils/settings';

export function Login(){
    const redirect = useRedirect()
    const initValue = { email: 'nikita.babenko.2015@gmail.com', password: 'Aa5aA_kak_slozhna' }

    const dispatch = useDispatch()

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
    
    const onClick = e =>{
        e.preventDefault();
        dispatch(postData(`${userURL}${login}`,form));
        setValue(initValue);

        //redirect('/')
    }

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
                        type={icon?'password':'text'}
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
                            onClick
                        }
                    >
                        Вход
                    </Button>
                </form>
                
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    Вы — новый пользователь? 
                    <a className={style.link} 
                        onClick={()=>{redirect('/register')}}
                    >Зарегистрироваться</a>
                </p>
                <p className="text text_type_main-default mt-4 text_color_inactive">
                    Забыли пароль? 
                    <a className={style.link}
                        onClick={()=>{redirect('/forgot-password')}}
                    >Восстановить пароль</a>
                </p>
            </main>
        </div>
    )
}