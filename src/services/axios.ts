import axios from "axios";
import { getTokenFromCookie } from "./cookie";

axios.defaults.baseURL = 'http://165.22.48.33/api';

export function setAuthToken () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getTokenFromCookie();
}

setAuthToken();