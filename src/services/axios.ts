import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

export default function setAuthToken () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

setAuthToken();