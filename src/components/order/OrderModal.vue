<template>
    <transition name="modal-animation">
        <div 
            class="fixed w-screen h-screen flex justify-center items-center bg-modal top-0 left-0" 
            @click.self="closeModal()"
        >
            <transition name="modal-animation-inner">
                <div class="w-[320px] sm:w-[400px] p-3 sm:p-7 text-center bg-white rounded" >
                    <header class="font-bold text-xl">Total Price - {{ total }} Ks</header>
                    <FormKit 
                        type="form" 
                        @submit="submitForm"
                        submit-label="Checkout"
                        :submit-attrs="{
                            inputClass: 'w-full py-2 px-3 bg-blue-400 text-white hover:bg-blue-500 font-bold'
                        }"
                        input-class="flex flex-col gap-4"
                    >
                        <div class="mb-3 text-start">
                            <FormKit 
                                type="text" 
                                label="Phone" 
                                name="phone"
                                validation="required | length: 9, 15"
                                placeholder="Enter phone number"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50"  
                            />
                        </div>
                        <div class="mb-3 text-start">
                            <FormKit 
                                type="textarea" 
                                label="Address" 
                                name="address"
                                validation="required"
                                placeholder="Enter message"
                                input-class="w-full py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50" 
                            />
                        </div>
                    </FormKit >
                    <div class="my-3 text-start">
                        <button
                            @click="closeModal()"
                            class="w-full py-2 px-3 bg-white hover:bg-blue-200 font-bold border border-1 border-black"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
 </template>
 
<script lang="ts" setup>
defineProps<{
    total?: number
}>();

const emit = defineEmits<{
    submit: [data: FormData],
    close: []
}>()

const submitForm = (formData: FormData) => {
    emit('submit', formData);
} 

const closeModal = () => {
    emit('close');
}

</script>
 
 <style scoped>
.modal-animation-enter-from,
.modal-animation-leave-to{
    opacity: 0;
}
.modal-animation-enter-active,
.modal-animation-leave-active{
    transition: all 0.3s ease;
}

.modal-animation-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}
.modal-animation-inner-leave-to{
    transform: scale(0.8);
}
.modal-animation-inner-enter-active{
    transition: all 0.3s ease 0.15s;
}
.modal-animation-inner-leave-active{
    transition: all 0.3s ease ;
}

 </style>
 