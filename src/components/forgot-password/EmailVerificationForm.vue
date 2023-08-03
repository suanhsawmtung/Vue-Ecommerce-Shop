<template>
    <form @submit.prevent="submitVerificationForm" class="flex flex-col gap-4">    
        
        <div>
            <BaseInput 
                type="email" 
                label="Email"
                v-model="verificationFormData.email" 
            />
            <span 
                class="text-red-700 text-md"
                v-if="v$.email.$error"
            >
                {{ v$.email.$errors[0].$message }}
            </span>
        </div>
        
        <button 
            type="submit" 
            class="py-2 px-3 bg-blue-400 text-white hover:bg-blue-500 font-bold
                focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 w-full
                dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Verify Email
        </button>
        
    </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import BaseInput from '../BaseInput.vue';
import type { EmailVerificationFormData } from '../../types/user';

const emit = defineEmits<{
    submitVerificationFormEmit: [formData: EmailVerificationFormData] 
}>()

const verificationFormData = reactive({
    email: "",
});

// Vulidate Validation Rules 
const rules = computed(() => {
    return {
        email: { required, email },
    }
});

// Vuelidate Validation Checking 
const v$ = useVuelidate(rules, verificationFormData);

const submitVerificationForm = async() => {
    // Vuelidate Validation 
    const result = await v$.value.$validate();
    
    if(result){
        emit('submitVerificationFormEmit', verificationFormData);
    }
}

</script>

<style scoped>

</style>