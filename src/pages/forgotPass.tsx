import React, { useCallback, useState } from 'react';

import { FC } from 'react';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './styles.module.css'

import { url, reset_step1 } from '../utils/settings';

import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../services/utils/hooks';
import { req_FAILED, req_REQUEST, req_SUCCESS, setLogin } from '../services/reducers/user';
import { setCookie } from '../services/utils/cookie';


export const ForgotPassword: FC = () => {

    const history = useHistory();
    const location = useLocation();

    const dispatch = useAppDispatch()
    const initValue = { email: '' }
    const [form, setValue] = useState(initValue);

    const axios = require('axios').default;

    const postData = (url: string, form: any) => {

        dispatch(req_REQUEST())

        axios.post(url, form)
            .then((response) => {
                setCookie(response.data);

                //console.log(response.data)
                dispatch(
                    req_SUCCESS(response.data)
                );

                if (url.indexOf('/login') !== -1) {
                    dispatch(setLogin(true))
                }

            })
            .catch((error) => {
                dispatch(req_FAILED());
                console.log("error", error);
            })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Good')
        if (form != initValue) {
            console.log(history)
            postData(`${url}${reset_step1}`, form)
            setValue(initValue)

            history.push({ pathname: "/reset-password", state: { from: location } })

            console.log(history)
        }

    }


    return (
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
                    <div className='mt-6' />
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
                        onClick={() => { history.push({ pathname: '/login', state: { from: location } }) }}
                    >Войти</a>
                </p>
            </main>
        </div>
    )
}