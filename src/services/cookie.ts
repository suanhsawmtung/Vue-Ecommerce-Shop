import Cookies from 'js-cookie';

export function saveTokenToCookie(token: string){
    Cookies.set('_token', token, { expires: 7 });
}

export function getTokenFromCookie(){
    return Cookies.get('_token');
}

export function removeTokenFromCookie(){
    Cookies.remove('_token');
}