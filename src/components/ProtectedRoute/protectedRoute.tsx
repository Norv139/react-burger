import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';
import { refreshToken as refreshTokenFn } from '../../services/utils/auth';
import { getCookie } from '../../services/utils/cookie';
import { setLogin } from '../../services/reducers/user';
import { useAppDispatch, useAppSelector } from '../../services/utils/hooks';


interface IRootStore {
  user:{
    isLogin: boolean
  }
}

export function ProtectedRoute({ children, path }: RouteProps ) {
  const dispatch = useAppDispatch()
  
  const history = useHistory()
  const isLogin = useAppSelector((store)=>store.user.isLogin)
  const refreshToken = getCookie('refreshToken')
  const accessToken = getCookie('accessToken')

  if (!isLogin && refreshToken  ){
    refreshTokenFn()
    console.log("REFRESH")
    if ( accessToken !== undefined){
      dispatch(setLogin(true))
      history.push({ pathname: "/login", state: { from: path } })
    }
  }

  return (
    <Route path={path}>
      {
        isLogin === true ?
        (
          children
        ):(
          <Redirect to={{ pathname: "/login", state: { from: path } }}  />
        )
      }
    </Route>
  );
}
