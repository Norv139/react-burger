import Cookies from 'js-cookie'

export function setCookie (response: { accessToken: string; refreshToken: string; }) {

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

export function createCookie(name:string, value:string){
    Cookies.set(name, value)
}

export function getCookie(name:string){
    return Cookies.get(name)
}
  

export function deleteCookie(name:string) {
    Cookies.set(name, '', {expires: -1})
}