<template>
    <div class="flex justify-center items-center w-screen h-screen bg-gray-200 overflow-x-hidden">
        <div class="p-5 rounded-sm bg-white flex flex-col gap-3 w-[350px] sm:w-[400px] shadow-md">
            
            <header class="font-bold text-xl">Create your shop account.</header>
            
            <form @submit.prevent="submitRegisterForm" class="flex flex-col gap-4">
                
                <div>
                    <BaseInput 
                        type="text" 
                        label="Username" 
                        v-model="registerFormData.name" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.name.$error"
                    >
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </div>
                
                <div>
                    <BaseInput 
                        type="email" 
                        label="Email" 
                        v-model="registerFormData.email" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.email.$error"
                    >
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
                
                <div>
                    <BaseInput 
                        type="password" 
                        label="Password" 
                        v-model="registerFormData.password" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.password.$error"
                    >
                        {{ v$.password.$errors[0].$message }}
                    </span>
                </div>
                
                <div>
                    <BaseInput 
                        type="password" 
                        label="Confirm Password" 
                        v-model="registerFormData.password_confirmation" 
                    />
                    <span 
                        class="text-red-700 text-md"
                        v-if="v$.password_confirmation.$error"
                    >
                        {{ v$.password_confirmation.$errors[0].$message }}
                    </span>
                </div>
                
                <button 
                    type="submit" 
                    class="py-2 px-3 bg-blue-400 text-white hover:bg-blue-500 font-bold
                        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 w-full
                        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Register
                </button>
            
            </form>
            
            <div class="text-center">
                <span class="text-xs">
                    Already member?
                    <RouterLink to="/login" class="text-blue-700 active:text-blue-300">Login</RouterLink >
                    here.
                </span>
            </div>
        
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import setAuthToken from '@/services/axios';
import { RouterLink } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators';
import BaseInput from '@/components/BaseInput.vue';
import router from '@/router';

const auth = useAuthStore();

const registerFormData = reactive({
    name: "",
    email: "",
    role: "customer",
    password: "",
    password_confirmation: ""
});

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(4), maxLength: maxLength(15) },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        password_confirmation: { required, minLength: minLength(6), sameAs: sameAs(registerFormData.password) }
    }
});

const v$ = useVuelidate(rules, registerFormData);

const submitRegisterForm = async() => {
    const result = await v$.value.$validate();
    if(result){
        await auth.register(registerFormData);
        if(auth.isAuthenticated) {
            localStorage.setItem("token", auth.user.token); 
            setAuthToken();
            router.push({ path: '/' });
        }
    }
}

</script>

<style scoped>

</style>