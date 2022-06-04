import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../services/utils';

import { useHistory } from 'react-router';

export function ProtectedRoute({ children, ...rest }) {
  const history = useHistory()

  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getCookie('accessToken')
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          
        )
      }
    />
  );
}