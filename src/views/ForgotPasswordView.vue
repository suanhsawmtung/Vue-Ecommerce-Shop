<template>
    <div class="flex justify-center items-center w-screen h-screen bg-gray-200 overflow-x-hidden">
        <div class="p-5 rounded-sm bg-white flex flex-col gap-3 w-[350px] sm:w-[400px] shadow-md">
            
            <header class="font-bold text-xl">Forgot your password?</header>

            <p class="text-xs">Please enter the account that you want to reset the password.</p>
            
            <EmailVerificationForm 
                v-if="route.params.form === 'emailVerification'"
                @submitVerificationFormEmit="submitVerificationForm"
            />

            <ResePasswordForm 
                v-if="route.params.form === 'resetPassword'"
                @submitResetFormEmit="submitResetForm"
            />
            
            <div class="flex justify-between" v-if="route.params.form === 'emailVerification'">
                <span class="text-xs">
                    <RouterLink to="/login" class="text-blue-700 active:text-blue-300">Go Back</RouterLink>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { Toast } from '@/services/alert';
import { saveToCookie, getFromCookie, removeFromCookie } from '@/services/cookie';
import type { EmailVerificationFormData, ResetPasswordFormData } from '@/types/user';
import EmailVerificationForm from '@/components/forgot-password/EmailVerificationForm.vue';
import ResePasswordForm from '@/components/forgot-password/ResetPasswordForm.vue';


const account = useAccountStore();
const route = useRoute();
const router = useRouter();


const submitVerificationForm = async(verificationFormData: EmailVerificationFormData) => {
    
    await account.emailVerification(verificationFormData);
    
    if(account.email_verification_token !== ''){
        saveToCookie('verification_token', account.email_verification_token);
        router.push({ path: '/login' });
        setTimeout(() => {
            Toast.fire({
                icon: 'success',
                title: 'We will send a password reset mail.'
            });
        }, 300);
    }
}

const submitResetForm = async(resetFormData: ResetPasswordFormData) => {
    
    const res = await account.resetPassword(resetFormData);

    if(res === 'success'){
        removeFromCookie('verification_token');
        router.push({ path: '/login' });
        setTimeout(() => {
            Toast.fire({
                icon: 'success',
                title: 'Reset password successfully.'
            });
        }, 300);
        setTimeout(() => {
            Toast.fire({
                icon: 'info',
                title: 'Please login again.'
            });
        }, 3000);
    }else{
        setTimeout(() => {
            Toast.fire({
                icon: 'error',
                title: 'Something was wrong.'
            });
        }, 3000);
    }

}

onMounted(() => {
    if(
        route.params.form === 'resetPassword' && 
        route.query.token !== getFromCookie('verification_token')
    ){
        router.push({ path: '/forgotPassword/emailVerification' });
        setTimeout(() => {
            Toast.fire({
                icon: 'info',
                title: 'Please verify your email first.'
            });
        }, 300);
    }
})

</script>