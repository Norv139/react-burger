
import React, { useEffect, useMemo, useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'


import style from './styles.module.css'

import { setLogin } from '../services/reducers/user';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/utils/hooks';
import { logoutUser } from '../services/action/logoutUser';

import { getUser } from '../services/action/getUser';
import { patchData } from '../services/action/patchData';



export const Profile: React.FC = () => {  

    const dispatch = useAppDispatch()    

    const history = useHistory()
    const location = useLocation();

    const initValueUser = { 
        email: '', 
        password: '', 
        name: '' };

    const [actuslForm, setActuslForm] = useState(initValueUser);

    const [form, setValue] = useState(initValueUser);

    const [wasAChange, setWasAChange] = useState(false);
    const user = useAppSelector(state=>state.user.data)

    useEffect(()=>{
        dispatch(getUser())
        //console.log(dataUser)
    }, [])

    const userData = useMemo(
        ()=>{          
            setActuslForm({...initValueUser, ...user})
            setValue({...initValueUser, ...user})
            return {...initValueUser, ...user}
        }, [user]
    )


    const onChange =  (e:React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            setValue({ ...form, [e.target.name]: e.target.value });
            setWasAChange(true)
        }
    
    const onSave =  (e?:React.ChangeEvent<HTMLButtonElement>) => {
        if (e){
            e.preventDefault()
        }
        dispatch(patchData(form))

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
                        ??????????????
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + "text_color_inactive"}
                        onClick={()=>{history.push({pathname: '/profile/orders', state: { from: location } })}}
                    >
                        ?????????????? ??????????????
                    </p>

                    <p 
                        className={style.p_text + " text text_type_main-medium " + "text_color_inactive"}
                        onClick={()=>{ 
                            dispatch(setLogin(false)); 
                            dispatch(logoutUser()); 
                            history.push({pathname: '/', state: { from: location } });
                        }}
                    >
                        ??????????
                    </p>

                    <div className='mt-20' />

                    <p className={style.p_text + " text text_type_main-default text_color_inactive"}>
                        ?? ???????? ?????????????? ???? ????????????
                        ???????????????? ???????? ???????????????????????? ????????????
                    </p>

                </span>

                <form className={style.main}>
                    <Input 
                        placeholder={'??????'}
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
                        placeholder={'????????????'} 
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
                            ??????????????????
                        </Button>
                        <div className='mt-6'/>
                        <Button onClick={onCancel}>
                            ????????????
                        </Button>
                    </>
                    }
                </form> 
            </main>
        </div>
    )
}
