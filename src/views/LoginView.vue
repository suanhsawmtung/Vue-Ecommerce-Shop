<template>
    <div class="flex justify-center items-center w-screen h-screen bg-gray-200 overflow-x-hidden">
        <div class="p-5 rounded-sm bg-white flex flex-col gap-3 w-[350px] sm:w-[400px] shadow-md">
            
            <header class="font-bold text-xl">Welcome to Vue Shop! Please Login.</header>
            
            <form @submit.prevent="submitLoginForm" class="flex flex-col gap-4">
                
                <div >
                    <BaseInput 
                        type="email" 
                        label="Email"
                        v-model="loginFormData.email" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.email.$error"
                    >
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
                
                <div >
                    <BaseInput 
                        type="password" 
                        label="Password"
                        v-model="loginFormData.password" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.password.$error"
                    >
                        {{ v$.password.$errors[0].$message }}
                    </span>
                </div>
                
                <button 
                    type="submit" 
                    class="py-2 px-3 bg-blue-400 text-white hover:bg-blue-500 font-bold
                        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 w-full
                        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Login
                </button>
                
            </form>
            
            <div class="flex justify-between">
                <span class="text-xs">
                    New member?
                    <RouterLink to="/register" class="text-blue-700 active:text-blue-300">Register</RouterLink >
                    here.
                </span>
                <span class="text-xs">
                    <a href="#" class="text-blue-700 active:text-blue-300">Forgot Password?</a>
                </span>
            </div>
            
            <div class="text-center text-sm">_____ OR _____</div>
            
            <div class="flex flex-col gap-4">
                <a 
                    href="#" 
                    class="py-2 px-3 bg-red-700 text-white hover:bg-red-800 text-center
                        focus:ring-4 focus:ring-red-300 dark:bg-red-600 w-full
                        dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                    <span class="text-sm font-bold">
                        Login with Google
                    </span>
                </a>
                <a 
                    href="#" 
                    class="py-2 px-3 bg-blue-700 text-white hover:bg-blue-800 text-center
                        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 w-full
                        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    <span class="text-sm font-bold">
                        Login with Facebook
                    </span>
                </a>
            </div>
        
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import setAuthToken from '@/services/axios';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import BaseInput from '@/components/BaseInput.vue';
import router from '@/router';

const auth = useAuthStore();

const loginFormData = reactive({
    email: "",
    role: "customer",
    password: "",
});

const rules = computed(() => {
    return {
        email: { required, email },
        password: { required, minLength: minLength(6) }
    }
});

const v$ = useVuelidate(rules, loginFormData);

const submitLoginForm = async() => {
    const result = await v$.value.$validate();
    if(result){
        await auth.login(loginFormData);
        if(auth.isAuthenticated){
            localStorage.setItem("token", auth.user.token);
            setAuthToken();
            router.push({ path: '/' });
        }
    }
}

</script>

<style scoped>

</style>