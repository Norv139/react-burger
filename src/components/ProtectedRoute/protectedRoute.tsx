import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { refreshToken as refreshTokenFn } from '../../services/auth';
import { getCookie } from '../../services/utils';
import { useSelector } from 'react-redux';


interface IRootStore {
  user:{
    previousPath:Array<string|null>
  }
}

export function ProtectedRoute({ children, path }: RouteProps ) {

  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')
  const pathUrl = useSelector((store:IRootStore)=>store.user.previousPath)

  if (accessToken === undefined && refreshToken ){
    refreshTokenFn()
  }

  console.log(pathUrl)

  return (
    <Route path={path}>
      {
        accessToken ?
        (
          children
        ):(
          <Redirect to={{pathname: '/login'}} />
        )
      }
    </Route>
  );
}
