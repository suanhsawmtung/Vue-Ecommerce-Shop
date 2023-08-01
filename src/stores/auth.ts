import { defineStore } from "pinia";
import axios from "axios";
import type { UserTypes, User, RegisterFormData, LoginFormData } from "@/types/user";

export const useAuthStore = defineStore('auth', {
    state: (): UserTypes => ({
        user: <User>{},
        isAuthenticated: false,
        registerError: ''
    }),
    actions: {
        async register(registerFormData: RegisterFormData ){
            try{
                const { data } = await axios.post('/auth/register', registerFormData);
                this.user = data.user;
                this.isAuthenticated = true;
            }catch(error){
                console.log(error);
            }
        },
        async login(loginFormData: LoginFormData){
            try{
                const { data } = await axios.post('/auth/login', loginFormData);
                this.user = data.user;
                this.isAuthenticated = true;
            }catch(error){
                console.log(error);
            }
        },
        async logout(){
            try{
                const { data } = await axios.get('/auth/logout');
                this.isAuthenticated = false;
                this.user = <User>{};
            }catch(error){
                console.log(error);
            }
        },
        async getLoginUser() {
            const { data } = await axios.get('/user/getProfileData');
            this.user = data.user;
            this.isAuthenticated = true;
        },
        async loginWithGoogle(){
            location.href = 'http://localhost:8000/api/auth/google/redirect';
        },
        async loginWithFacebook(){
            location.href = 'http://localhost:8000/api/auth/facebook/redirect';
        },
        async providerLogin(email: string | string []){
            try{
                const { data } = await axios.get(`/auth/provider/login/${email}`);
                this.user = data.user;
                this.isAuthenticated = true;
            }catch(error){
                console.log(error);
            }
        },
    }
})