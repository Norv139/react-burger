import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './styles.module.css'

import { url, login } from '../utils/settings';
import { req_FAILED, req_REQUEST, req_SUCCESS, setLogin } from '../services/reducers/user';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { getCookie, setCookie } from '../services/utils/cookie';
import { useAppDispatch } from '../services/utils/hooks';


export function Login(){
    
    const initValue = { email: '', password: '' }

    const dispatch = useAppDispatch()
    const history = useHistory();
    const location = useLocation();


    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);

    const axios = require('axios').default;

    const postData = (url: string, form:any) => {

        dispatch(req_REQUEST())

        axios.post(url, form)
        .then( (response) => {
            setCookie(response.data);

            //console.log(response.data)
            dispatch(
                req_SUCCESS(response.data)
                );

            if (url.indexOf('/login') !== -1){
                    dispatch(setLogin(true))
            }

        })
        .catch( (error) => {
            dispatch(req_FAILED());
            console.log("error", error);
        })
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    
    const onClick = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        postData(`${url}${login}`,form);

        setValue(initValue);

        if (getCookie('accessToken') !== undefined){
            dispatch(setLogin(true));
            history.push(location)
        }
    }   

    return(
        <div className={style.over}>
            <main className={style.main}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
                <form className={style.main} onSubmit={onClick}>
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
                        Вход
                    </Button>
                </form>
                
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    Вы — новый пользователь? 
                    <Link to='/register' className={style.link}>Зарегистрироваться </Link>
                </p>
                <p className="text text_type_main-default mt-4 text_color_inactive">
                    Забыли пароль? 
                    <Link to={{pathname: "/forgot-password", state: { from: location }}} className={style.link}>Восстановить пароль </Link>
                </p>
            </main>
        </div>
    )
}