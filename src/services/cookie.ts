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

export function saveToCookie(key: string, value: string){
    Cookies.set(key, value);
}

export function getFromCookie(key: string){
    return Cookies.get(key);
}

export function removeFromCookie(key: string){
    Cookies.remove(key);
}