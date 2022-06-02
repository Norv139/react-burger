import React, { useCallback, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './style.module.css'

export function ForgotPassword(){

    const [form, setValue] = useState({ email: ''});
    const [icon, setIcon] = useState(true);


    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };

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
                        onClick={
                            e=>{
                                e.preventDefault(); 
                                console.log(form)
                            }
                        }
                    >
                        Восстановить
                    </Button>
                </form>
                
                <p className="text text_type_main-default mt-20 text_color_inactive">
                    Вспомнили пароль? <a className={style.link}>Войти</a>
                </p>
            </main>
        </div>
    )
}