<template>
    <main class="overflow-x-hidden">
        <section class="w-screen h-auto sm:h-screen flex lg:flex-row flex-col bg-gray-100">
            <div class="w-full lg:w-3/6 h-auto sm:h-full pt-16 sm:pt-0 flex justify-center items-center">
                <div class="w-5/6 ">
                    <h1 class="font-bold sm:text-3xl text-xl text-blue-800 mb-3">
                        Have a question, comment, feedback or need more informations?
                    </h1>
                    <p class="font-normal text-slate-500 mb-4 text-xs sm:text-base">
                        Whether you need assistance with an order, have a product inquiry, 
                        or simply want to share your thoughts, feel free to reach out to 
                        us using the contact details below.
                    </p>
                    <h1 class="mt-6 mb-3 text-xl font-medium text-gray-900">
                        Contact Informations
                    </h1>
                    <ul class="text-slate-500 text-sm">
                        <li class="mb-2">Phone: +979-783312791</li>
                        <li class="mb-2">Address: Yangon, Myanmar</li>
                        <li class="mb-2">Email: suanhsawmtung210899@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div class="w-full lg:w-3/6 h-auto sm:h-full py-12 sm:py-0 sm:pt-6 md:pt-12 flex justify-center items-center">
                <div class="p-5 rounded-sm bg-white mb-12 lg:mb-0 flex flex-col gap-3 w-[340px] sm:w-[400px] shadow-lg ">
                    <header class="font-bold text-xl">Get In Touch</header>
                    <FormKit 
                        type="form" 
                        id="contactForm"
                        :disabled="disable"
                        @submit="submitContactForm"
                        submit-label="Submit"
                        :submit-attrs="{
                            inputClass: 'w-full py-2 px-3 bg-blue-400 text-white hover:bg-blue-500 font-bold active:scale-95 duration-150'
                        }"
                        input-class="flex flex-col gap-4"
                    >
                        <div class="mb-3">
                            <FormKit 
                                type="text" 
                                label="Name"
                                :disabled="disable" 
                                name="name"
                                placeholder="Enter name"
                                validation="required | length: 5"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50"  
                            />
                        </div>
                        <div class="mb-3">
                            <FormKit 
                                type="email" 
                                label="Email" 
                                :disabled="disable"
                                name="email"
                                validation="required | email"
                                placeholder="Enter email"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50"  
                            />
                        </div>
                        <div class="mb-3">
                            <FormKit 
                                type="text" 
                                label="Phone" 
                                :disabled="disable"
                                name="phone"
                                validation="required | length: 9, 15"
                                placeholder="Enter phone number"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50"  
                            />
                        </div>
                        <div class="mb-3">
                            <FormKit 
                                type="textarea" 
                                label="Message" 
                                :disabled="disable"
                                name="message"
                                validation="required"
                                placeholder="Enter message"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50" 
                            />
                        </div>
                    </FormKit >
                </div>
            </div>
        </section>
        <Footer />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { reset } from '@formkit/core';
import { useAuthStore } from '@/stores/auth';
import { useContactStore } from '@/stores/contact';
import { Toast } from '@/services/alert';
import Footer from '../components/Footer.vue';

const router = useRouter();
const auth = useAuthStore();
const contact = useContactStore();

const disable = ref<boolean>(false);

const submitContactForm = (formData: FormData) => {
    if(auth.isAuthenticated){
        disable.value = true;
        contact.sendMessageToAdminTeam(formData)
        .then(res => {
            if(res === 'success'){
                reset('contactForm', '');
                toastAlert('success', 'Sent message successfully...');
            }else{
                toastAlert('error', 'Sending message fails...');
            }
        }).catch(err => {
            toastAlert('error', 'Sending message fails...');
        });
    }else{
        router.push({ path: '/login' });
        toastAlert('info', 'Please login first.');
    }
} 

const toastAlert = (Icon: any, Title: any) => {
    Toast.fire({
        icon: Icon,
        title: Title
    });

    disable.value = false;
}

</script>
