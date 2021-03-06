import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';
import { refreshToken as refreshTokenFn } from '../../services/utils/auth';
import { getCookie } from '../../services/utils/cookie';
import { setLogin } from '../../services/reducers/user';
import { TRootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../services/utils/hooks';

interface Ihistory {
  location:{
    state:{
      from: any
    }
  }
}

export function PublicRoute({ children, path }: RouteProps ) {
  const dispatch = useAppDispatch()
  
  const history = useHistory()
  const isLogin = useAppSelector((store)=>store.user.isLogin)
  const refreshToken = getCookie('refreshToken')
  const accessToken = getCookie('accessToken')

  const state = history.location.state as { from: string }

  if (!isLogin && refreshToken  ){
    
    console.log("REFRESH", refreshTokenFn())
    if ( accessToken !== undefined ){
      dispatch(setLogin(true))
      history.push({ pathname: "/login", state: { from: path } })
    }
  }

  return (
    <Route path={path}>
      { !isLogin ? (
        children
      ):( 
          history.location.state ?(
            <Redirect to={`${state.from}`}/>
          ):(
            <Redirect to='/'/>
          )
        )
      }
    </Route>
  );
}
