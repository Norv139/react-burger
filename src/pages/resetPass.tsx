import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';


import { postData } from '../services/actions/user';
import { url, reset_step2 } from '../utils/settings';
import { useRedirect } from '../services/utils';
import { setPreviousPath } from '../services/reducers/user';

import style from './style.module.css'

interface IStore{
    user:{
        previousPath: Array< null | string >
    }
}

export const ResetPassword: React.FC = () => {

    const pathHistory = useSelector((store:IStore)=>store.user.previousPath)

    const redirect = useRedirect()
    const dispatch = useDispatch()

    const initValue = { password: '', token: '' }

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
    
    const onClick = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        setValue(initValue)
        dispatch(setPreviousPath('/forgot-password'))
        dispatch( postData(`${url}${reset_step2}` ,form) as any)
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
