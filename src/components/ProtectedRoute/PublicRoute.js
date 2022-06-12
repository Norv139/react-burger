import { Redirect, Route } from 'react-router-dom';
import { refreshToken } from '../../services/auth';
import { getCookie } from '../../services/utils';

export function PublicRoute ({ children, path, exact }) {

    const accessToken = getCookie('accessToken')
  
  
    return (
      <Route path={path} exact={exact}>
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