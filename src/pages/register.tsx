
import React, { useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'


import style from './styles.module.css'

import { url, register } from '../utils/settings';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../services/utils/hooks';
import { postData } from '../services/action/postData';


export const Register: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    const dispatch = useAppDispatch()

    const initValue = { email: '', password: '', name: '' }

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);
    
    const axios = require('axios').default;

    

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        dispatch(postData( `${url}${register}`, form))
        setValue(initValue);
        history.push({pathname: '/', state: { from: location}});
    }

    return(
        <div className={style.over}>
            <main className={style.main}>
                <p className="text text_type_main-medium mb-6">
                    Регистрация
                </p>
                <form className={style.main} onSubmit={onClick}>
                    <Input 
                        placeholder={'Имя'}
                        type='text'
                        name='name'
                        value={form.name} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
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
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    Уже зарегистрированы? 
                    <a className={style.link}
                        onClick={()=>{
                            history.push({pathname: '/login', state: { from: location}})
                        }}
                    >Войти</a>
                </p>
            </main>
        </div>
    )
}
