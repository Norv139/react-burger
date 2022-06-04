import { useHistory } from 'react-router-dom';
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

export function usePrivatRedirect(path){
    const history = useHistory()
    return (path)=>{history.replace({ pathname: `${path}` });}
}

export function useRedirect(path){
    const history = useHistory()
    return (path)=>{history.push({ pathname: `${path}` });}
}