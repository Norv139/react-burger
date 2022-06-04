import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'
import { useDispatch } from 'react-redux';

import { postData } from '../services/actions/user';
import { userURL, reset_step1 } from '../utils/settings';

import { useRedirect, usePrivatRedirect } from '../services/utils';


export function ForgotPassword(){

    const redirect = useRedirect()
    const pispatch = useDispatch()
    const initValue = { email: ''}
    const [form, setValue] = useState(initValue);


    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = e =>{
            e.preventDefault(); 
            if (form != initValue){
                pispatch(postData(`${userURL}${reset_step1}`, form))
                setValue(initValue)

                redirect('/reset-password') 
            }
            
        }
    

    return(
        <div className={style.over}>
            <main className={style.main}>
                <p className="text text_type_main-medium mb-6">
                Восстановление пароля
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
                    <Button 
                        type="primary" 
                        size="medium"
                        onClick={onClick}
                    >
                        Восстановить
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