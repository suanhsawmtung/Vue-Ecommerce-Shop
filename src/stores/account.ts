import { defineStore } from "pinia";
import axios from "axios";
import type { UserAccountOperationData, EmailVerificationFormData, ResetPasswordFormData } from "@/types/user";

export const useAccountStore = defineStore('account', {
    state: (): UserAccountOperationData => ({
        email_verification_token: '',
    }),
    actions: {
        async emailVerification(form: EmailVerificationFormData){
            try{
                const { data } = await axios.post('/account/emailVerification', form);
                this.email_verification_token = data.token;
            }catch(error){
                console.log(error);
            }
        },
        resetPassword(form: ResetPasswordFormData){
            return new Promise(async(resolve, reject) => {
                await axios.post('/account/resetPassword', form)
                    .then(res => resolve(res.data.status))
                    .catch(err => reject(err));
            })
        }
    }
})