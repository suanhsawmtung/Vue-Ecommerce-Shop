<template>
    <div class="w-screen relative overflow-x-hidden">
        <Teleport to="#app">
            <OrderModal 
                v-if="isOrdered" 
                :total="order.FinalCartPrice"
                @close="isOrdered = false"
                @submit="submitOrder"
            />
        </Teleport>
        <div 
            v-if="!order.orderFinished && order.cartItems.length !== 0"
            class="w-full flex justify-between items-center p-5 mt-16"
        >
            <h3 class="text-xl font-extrabold">
                Your Cart
            </h3>
            <button
                type="button" disabled
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Cash on delivery
            </button>
        </div>

        <CartList 
            v-if="!order.orderFinished && order.cartItems.length !== 0"
            :cartItems="order.cartItems"
            :finalCartPrice="order.FinalCartPrice"
            @changeQuantity="changeQuantity"
            @deleteCartItem="deleteCartItem"
        />

        <div 
            v-if="!order.orderFinished && order.cartItems.length !== 0"
            class="w-full flex justify-end items-center p-5"
        >
            <button @click="isOrdered = true"
                type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                Order Now
            </button>
        </div>

        <div 
            v-if="order.orderFinished || order.cartItems.length === 0"
            class="w-full h-screen flex flex-col justify-center items-center gap-y-4"
        >
            <h3 class="text-xl font-extrabold" >
                No Cart Item.
            </h3>
            <button 
                @click="router.push({ path: '/shop' })"
                class="w-64 sm:w-96 py-2 px-3 bg-white hover:bg-blue-200 font-bold border border-1 border-black"
            >
                Continue Shopping
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useOrderStore } from '@/stores/order';
import { Modal, Toast } from '@/services/alert';
import type { CartItem, CartItemActionTerm, OrderFormDataType } from '@/types/order';
import OrderModal from '@/components/order/OrderModal.vue';
import CartList from '@/components/order/CartList.vue';

const router = useRouter();
const auth = useAuthStore();
const order = useOrderStore();

const isOrdered = ref<boolean>(false);
const queryTimeout = ref();

const changeQuantity = (item: CartItem, action: CartItemActionTerm) => {
    if(action === 'plus') item.quantity += 1;
    else item.quantity -= 1;

    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async() => {
        order.updateCartItemQuantity(item);
    }, 500); 

}

const submitOrder = async (formData: OrderFormDataType) => {
    await order.orderCheckout(formData);
    isOrdered.value = false;
    router.push({ name: 'shop' });;
    Toast.fire({
        icon: 'success',
        title: 'Ordered successfully'
    });
}

const deleteCartItem = (id: number) => {
    Modal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            await order.deleteCartItem(id);
            Toast.fire({
                icon: 'success',
                title: 'Deleted successfully'
            });
        }
    })
}

onMounted(async() => {
    await order.getAllCartItems();
})

</script>