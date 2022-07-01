import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { refreshToken } from '../../services/auth';
import { getCookie } from '../../services/utils';




export function PublicRoute ({ children, path}:RouteProps) {

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