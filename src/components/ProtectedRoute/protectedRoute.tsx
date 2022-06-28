import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { refreshToken } from '../../services/auth';
import { getCookie } from '../../services/utils';

interface IProtectedRoute{
  children: React.ReactNode;
  path: string;
  exact?:boolean
}

export function ProtectedRoute({ children, path, exact }: IProtectedRoute ) {

  const accessToken = getCookie('accessToken')

  if (accessToken === undefined){
    refreshToken()
  }

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
