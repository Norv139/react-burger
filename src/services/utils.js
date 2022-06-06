import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPreviousPath } from './reducers/user';
import Cookies from 'js-cookie'

export function setCookie (response) {
    if(response.accessToken){
       var {accessToken, refreshToken} = response

       var in20Minutes = 1/72;
       Cookies.set(
           'accessToken', accessToken, 
           {expires: in20Minutes}
        );

       Cookies.set('refreshToken', refreshToken);
    }
}

export function getCookie(name){
    return Cookies.get(name)
}
  

export function deleteCookie(name) {
    Cookies.set(name, '', {expires: -1})
}

export function useRedirect(path){
    const dispatch = useDispatch()
    const history = useHistory()
    
    return (path)=>{
        dispatch(setPreviousPath(`${path}`));
        history.push({ pathname: `${path}` });
    }
}