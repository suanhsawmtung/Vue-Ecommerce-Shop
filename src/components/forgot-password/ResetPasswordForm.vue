<template>
    <form @submit.prevent="submitResetForm" class="flex flex-col gap-4">    
        
        <div>
            <BaseInput 
                type="email" 
                label="Email"
                v-model="resetFormData.email" 
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
                label="New Password"
                v-model="resetFormData.password" 
            />
            <span 
                class="text-red-700 text-md"
                v-if="v$.password.$error"
            >
                {{ v$.password.$errors[0].$message }}
            </span>
        </div>

        <div >
            <BaseInput 
                type="password" 
                label="Confirmed Password"
                v-model="resetFormData.password_confirmation" 
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
            Reset Password
        </button>
        
    </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { getFromCookie } from '@/services/cookie';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators';
import BaseInput from '../BaseInput.vue';
import type { ResetPasswordFormData } from '../../types/user';

const emit = defineEmits<{
    submitResetFormEmit: [formData: ResetPasswordFormData] 
}>()

const resetFormData = reactive({
    token: getFromCookie('verification_token'),
    email: "",
    password: "",
    password_confirmation: ""

});

// Vulidate Validation Rules 
const rules = computed(() => {
    return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        password_confirmation: { 
            required, 
            minLength: minLength(6), 
            sameAs: sameAs(resetFormData.password) 
        }
    }
});

// Vuelidate Validation Checking 
const v$ = useVuelidate(rules, resetFormData);

const submitResetForm = async() => {
    // Vuelidate Validation 
    const result = await v$.value.$validate();
    
    if(result){
        emit('submitResetFormEmit', resetFormData);
    }
}

</script>