import React, { useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import { Redirect, useLocation } from 'react-router-dom';

import { url, reset_step2 } from '../utils/settings';

import { req_FAILED, req_REQUEST, req_SUCCESS, setLogin, setPreviousPath } from '../services/reducers/user';

import style from './styles.module.css'

import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../services/utils/hooks';
import { setCookie } from '../services/utils/cookie';
import { postData } from '../services/action/postData';

export const ResetPassword: React.FC = () => {

    const history = useHistory();
    const location = useLocation();
    const state = history.location.state as { from: {pathname: string} }

    const dispatch = useAppDispatch();

    const initValue = { password: '', token: '' }

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);

    const axios = require('axios').default;

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
    
    const onClick = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        setValue(initValue)
        dispatch(setPreviousPath('/forgot-password'))
        dispatch(postData(`${url}${reset_step2}` ,form))
    }

    return(
        <>
        {
            history.location.state ? (
                state.from.pathname === '/forgot-password' ? (
                        <div className={style.over}>
                        <main className={style.main}>
                            <p className="text text_type_main-medium mb-6">
                            Восстановление пароля
                            </p>
                            <form className={style.main} onSubmit={onClick}>
                                <Input 
                                    placeholder={'Введите новый пароль'} 
                                    type={icon?'password':'text'}
                                    name='password'
                                    icon={icon?'ShowIcon':'HideIcon'}
                                    value={form.password}
                                    onChange={onChange}
                                    onIconClick={()=>{setIcon(!icon)}}
                                />
                                <div className='mt-6'/>
                                <Input 
                                    placeholder={'Введите код из письма'}
                                    name='token'
                                    value={form.token} 
                                    onChange={onChange}
                                />
                                <div className='mt-6'/>
                                <Button 
                                    type="primary" 
                                    size="medium"
                                >
                                    Сохранить
                                </Button>
                            </form>
                            
                            <p className="text text_type_main-default mt-20 text_color_inactive">
                                Вспомнили пароль? 
                                <a className={style.link}
                                    onClick={()=>{
                                        history.push({pathname: '/login', state: { from: location }})
                                    }}
                                >Войти</a>
                            </p>
                        </main>
                        </div>
                    ):(
                        <Redirect to={{pathname: `/forgot-password`, state: { from: location }}}/>
                    )
            ):(
                <Redirect to={{pathname: `/forgot-password`, state: { from: location }}}/>
            )
        }
        
        </>
    )
}
