import React, { useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './styles.module.css'

import { url, login } from '../utils/settings';
import { setLogin } from '../services/reducers/user';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { getCookie } from '../services/utils/cookie';
import { useAppDispatch } from '../services/utils/hooks';
import { postData } from '../services/action/postData';


export function Login(){
    
    const initValue = { email: '', password: '' }

    const dispatch = useAppDispatch()
    const history = useHistory();
    const location = useLocation();


    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    
    const onClick = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        dispatch(postData(`${url}${login}`,form));

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