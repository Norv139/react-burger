import React, { useCallback, useState } from 'react';

import { FC } from 'react';

import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'
import { useDispatch } from 'react-redux';

import { postData } from '../services/actions/user';
import { userURL, reset_step1 } from '../utils/settings';

import { useRedirect } from '../services/utils';


export const ForgotPassword: FC = ()=> {

    const redirect = useRedirect()
    const pispatch = useDispatch()
    const initValue = { email: ''}
    const [form, setValue] = useState(initValue);


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

    const onClick = (e:React.ChangeEvent<HTMLFormElement>) =>{
            e.preventDefault(); 
            if (form != initValue){
                pispatch(postData(`${userURL}${reset_step1}`, form) as any)
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
                <form className={style.main} onSubmit={onClick}>
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