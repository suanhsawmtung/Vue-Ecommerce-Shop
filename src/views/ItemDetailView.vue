<template>
    <main class="overflow-x-hidden">
        <Teleport to="#app">
            <OrderModal 
                v-if="isOrdered" 
                :total="item.item.price * cartFormData.quantity"
                @close="isOrdered = false"
                @submit="submitOrder"
            />
        </Teleport>
        <section
            v-if="item.item.id"
            class="w-screen flex md:flex-row flex-col justify-between items-center 
                sm:mb-0 mb-4 mt-20 z-0"
        >
            
            <div class="md:w-6/12 w-full flex justify-center items-center">
                <div class="w-4/6">
                    <img :src="'http://localhost:8000/storage/products/'+item.item.image" class="w-full" alt="">
                </div>
            </div>
            
            <div class="md:w-6/12 w-full flex justify-start items-start p-4">
                <div class="w-full flex flex-col items-start">
                    <h1 class="font-semibold text-2xl text-blue-500 mb-3">
                        {{ item.item.title }}
                    </h1>
                    <span class="text-blue-500 text-2xl my-4">
                        Ks {{ item.item.price }}
                    </span>
                    <div class="flex flex-wrap gap-4 mb-4">
                        <p class="text-slate-500">
                            Category: <span class="ms-1 text-blue-500">{{ item.item.category.title }}</span>
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-4 mb-4">
                        <p class="text-slate-500">
                            Total Price: 
                            <span class="ms-1 text-blue-500">
                                {{ item.item.price * cartFormData.quantity }}
                            </span>
                        </p>
                    </div>
                    <div class="text-slate-500 flex items-center gap-2">
                        <span>Quantity: </span>
                        <div class="flex items-center">
                            <button 
                                :disabled="cartFormData.quantity === 1"
                                @click="cartFormData.quantity-=1"
                                class="w-12 p-1 text-white bg-slate-600 active:bg-slate-500"
                            >
                                <i class="material-icons">remove</i>
                            </button>
                            <input 
                                type="text" v-model="cartFormData.quantity" 
                                class="w-12 p-2 text-center border border-black border-1 rounded"
                            >
                            <button 
                                :disabled="cartFormData.quantity === item.item.count"
                                @click="cartFormData.quantity+=1"
                                class="w-12 p-1 text-white bg-slate-600 active:bg-slate-500"
                            >
                                <i class="material-icons">add</i>
                            </button>
                        </div>
                        <small v-if="item.item.count < 5" class="ms-1 text-slate-500">
                            Only {{ item.item.count }} left.
                        </small>
                    </div>
                    <div class="w-full flex justify-start items-center gap-x-4 mt-8">
                        <button 
                            @click="isOrdered = true"
                            class="w-3/6 lg:w-2/6 py-3 px-3 bg-blue-500 font-semibold text-white"
                        >
                            Buy Now
                        </button>
                        <button 
                            @click="addToCart()"
                            class="w-3/6 lg:w-2/6 py-3 px-3 bg-gray-500 font-semibold text-white"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>

        </section>
    </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useItemStore } from '@/stores/item';
import { useAuthStore } from '@/stores/auth';
import { useOrderStore } from '@/stores/order';
import { Toast } from '@/services/alert';
import type { OrderFormDataType } from '@/types/order';
import OrderModal from '@/components/order/OrderModal.vue';

const route = useRoute();
const router = useRouter();
const item = useItemStore();
const auth = useAuthStore();
const order = useOrderStore();

const cartFormData = reactive({
    id: route.params.id,
    quantity: 1
})

const isOrdered = ref<boolean>(false);

const addToCart= async() => {
    if(auth.isAuthenticated){
        const res = await order.addItemsToCart(cartFormData);
        if(res === 'created' || res === 'updated') 
            Toast.fire({
                icon: 'success',
                title: 'Added item to card.'
            });
    }else notAuthenticated();
}

const submitOrder = async (formData: OrderFormDataType) => {
    const buyNowForm = {
        phone: formData.phone,
        address: formData.address,
        product_id: item.item.id,
        quantity: cartFormData.quantity,
        total: item.item.price * cartFormData.quantity,
    }

    if(auth.isAuthenticated){
        const res = await order.buyNow(buyNowForm);
        if(res === 'success'){
            isOrdered.value = false;
            router.push({ name: 'shop' });;
            Toast.fire({
                icon: 'success',
                title: 'Ordered successfully'
            });
        }
    }else notAuthenticated();
}

const notAuthenticated = () => {
    router.push({ path: '/login' });
    setTimeout(() => {
        Toast.fire({
            icon: 'info',
            title: 'Please login first.'
        });
    },300);
}

onMounted(() => {
    item.getItem(route.params.id);
});

</script>