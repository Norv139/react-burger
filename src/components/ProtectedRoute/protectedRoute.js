import { Redirect, Route } from 'react-router-dom';
import { refreshToken } from '../../services/auth';
import { getCookie } from '../../services/utils';

export function ProtectedRoute({ children, path, exact }) {

  const accessToken = getCookie('accessToken')

  if (accessToken === undefined){
    refreshToken()
  }

  return (
    <Route path={path} exact={exact}>
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
