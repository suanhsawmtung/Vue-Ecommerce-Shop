import { defineStore } from "pinia";
import axios from "axios";

export const useContactStore = defineStore('contact', {
    actions: {
        sendMessageToAdminTeam(form: FormData){
            return new Promise(async(resolve, reject) => {
                await axios.post('/contact/contactAdminTeam', form)
                    .then(res => resolve(res.data.status))
                    .catch(err => reject(err));
            })
        }
    }
})