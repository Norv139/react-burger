import React from 'react';
import { Redirect, Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  if (!isLogin && refreshToken ){
    refreshTokenFn()
    console.log("REFRESH")
    if ( accessToken !== undefined){
      dispatch(setLogin(true))
    }
  }


  return (
    <Route path={location.pathname}>
      {
        isLogin !== true ?
        (
          <Redirect to={{ pathname: "/login", state: { from: location.pathname } }}  />
        ):(
          children
        )
      }
    </Route>
  );
}
