import axios from "axios";
import { getTokenFromCookie } from "./cookie";

axios.defaults.baseURL = 'http://localhost:8000/api';

export function setAuthToken () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getTokenFromCookie();
}

setAuthToken();