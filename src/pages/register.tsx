
import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';

import style from './style.module.css'

import { postData } from '../services/actions/user';
import { userURL, register } from '../utils/settings';

import { useRedirect } from '../services/utils';

export const Register: React.FC = () => {
    const redirect = useRedirect()
    const dispatch = useDispatch()

    const initValue = { email: '', password: '', name: '' }

    const [form, setValue] = useState(initValue);
    const [icon, setIcon] = useState(true);


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        console.log(form)
        dispatch(postData( `${userURL}${register}`, form) as any)
        setValue(initValue);
        redirect('/')
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
                        onClick={()=>{redirect('/login')}}
                    >Войти</a>
                </p>
            </main>
        </div>
    )
}
