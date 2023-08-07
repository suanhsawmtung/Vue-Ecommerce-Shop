import axios from "axios";
import { getTokenFromCookie } from "./cookie";

axios.defaults.baseURL = 'https://nooneuse.shop/api';

export function setAuthToken () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getTokenFromCookie();
}

setAuthToken();