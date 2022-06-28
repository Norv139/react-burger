import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { refreshToken } from '../../services/auth';
import { getCookie } from '../../services/utils';

interface IPublicRoute{
  children: React.ReactNode;
  path: string;
  exact?:boolean
}


export function PublicRoute ({ children, path, exact}:IPublicRoute) {

    const accessToken = getCookie('accessToken')
  
  
    return (
      <Route path={path}>
        {
          accessToken !== undefined ?
          ( 
            <Redirect to={{pathname: '/'}}/>
          ):(
            children
          )
        }
      </Route>
    );
  }