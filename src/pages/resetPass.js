import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import style from './style.module.css'

import { postData } from '../services/actions/user';
import { userURL, reset_step2 } from '../utils/settings';
import { useRedirect } from '../services/utils';
import { setPreviousPath } from '../services/reducers/user';

export function ResetPassword(){

    const pathHistory = useSelector(store=>store.user.previousPath)

    const redirect = useRedirect()
    const dispatch = useDispatch()

    const initValue = { password: '', token: '' }

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
    
    const onClick = e =>{
        e.preventDefault(); 
        setValue(initValue)
        dispatch(setPreviousPath('/forgot-password'))
        dispatch(postData(`${userURL}${reset_step2}` ,form))
    }

    return(
        <>
        {
            pathHistory[1] !== '/reset-password'?
            (
                <Redirect to={{pathname: `/forgot-password`}}/>
            ):(
                <div className={style.over}>
                <main className={style.main}>
                    <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                    </p>
                    <form className={style.main}>
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
                            onClick={
                                onClick
                            }
                        >
                            Сохранить
                        </Button>
                    </form>
                    
                    <p className="text text_type_main-default mt-20 text_color_inactive">
                        Вспомнили пароль? 
                        <a className={style.link}
                            onClick={()=>{redirect('/login')}}
                        >Войти</a>
                    </p>
                </main>
                </div>
            )
        }
        </>
    )
}
