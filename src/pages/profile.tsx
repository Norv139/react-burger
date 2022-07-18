
import React, { useEffect, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { getCookie } from '../services/utils/cookie';



import style from './styles.module.css'
import { setLogin } from '../services/reducers/user';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../services/utils/hooks';
import { logoutUser } from '../utils/logoutUser';
import { url } from '../utils/settings';



const axios = require('axios').default;


interface IResponse extends Response {
    data:{
        user:{
            email: string;
            name: string;
        }
    }
}


export const Profile: React.FC = () => {  

    const dispatch = useAppDispatch()    

    const history = useHistory()
    const location = useLocation();

    const initValueType = {
        profile: "text_color_inactive",
        orders: "text_color_inactive",
        logout: "text_color_inactive"
    };

    const initValueUser = { 
        email: '', 
        password: '', 
        name: '' };

    const [actuslForm, setActuslForm] = useState(initValueUser);

    const [form, setValue] = useState(initValueUser);
    const [select, setSelect] = useState(initValueType);

    const [wasAChange, setWasAChange] = useState(false);

    useEffect(()=>{

        axios.get(
            `${url}/auth/user`,
            {headers: {'authorization': `${getCookie('accessToken')}`}}
        ).then( (response: IResponse) => {
            setValue({...initValueUser, ...response.data.user})
            setActuslForm({...initValueUser, ...response.data.user})
        }).catch( (error: Response) => {
            console.log("error", error);
        })

    }, [])



    const onChange =  (e:React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            setValue({ ...form, [e.target.name]: e.target.value });
            setWasAChange(true)
        }
    
        const onSave =  (e?:React.ChangeEvent<HTMLButtonElement>) => {
            if (e){
                e.preventDefault()
            }

            axios.patch(
                `${url}/auth/user`, 
                {...form},
                {headers: {'authorization': `${getCookie('accessToken')}`}}
            ).then( (response:IResponse) => {
                setValue({...initValueUser, ...response.data.user})
                setActuslForm({...initValueUser, ...response.data.user})
                setWasAChange(false)
            }).catch( (error:Response) => {
                console.log("error", error);
            })
            
        }
        const onCancel =  (e?:React.ChangeEvent<HTMLButtonElement>) => {
            if (e){
                e.preventDefault()
            }
            setValue(actuslForm)
            setWasAChange(false)
        }
    
    
    

    return(
        <div className={style.over}>
            <main className={style.box}>
                <span className='mr-15'>

                    <p 
                        className={style.p_text + " text text_type_main-medium "}
                    >
                        Профиль
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + select.orders}
                        onClick={()=>{history.push({pathname: '/profile/orders', state: { from: location } })}}
                    >
                        История заказов
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + select.logout}
                        onClick={()=>{ 
                            dispatch(setLogin(false)); 
                            logoutUser(); 
                            history.push({pathname: '/', state: { from: location } });
                        }}
                    >
                        Выход
                    </p>

                    <div className='mt-20' />

                    <p className={style.p_text + " text text_type_main-default text_color_inactive"}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>

                </span>

                <form className={style.main}>
                    <Input 
                        placeholder={'Имя'}
                        type='text'
                        name='name'
                        icon={'EditIcon'}
                        value={form.name} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    <Input 
                        placeholder={'E-mail'}
                        type='email'
                        name='email'
                        icon={'EditIcon'}
                        value={form.email} 
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    <Input 
                        placeholder={'Пароль'} 
                        type='password'
                        name='password'
                        icon={'EditIcon'}
                        value={form.password}
                        onChange={onChange}
                    />
                    <div className='mt-6'/>
                    { wasAChange &&
                    <>
                        <Button onClick={onSave}>
                            Сохранить
                        </Button>
                        <div className='mt-6'/>
                        <Button onClick={onCancel}>
                            Отмена
                        </Button>
                    </>
                    }
                </form>
            </main>
        </div>
    )
}
