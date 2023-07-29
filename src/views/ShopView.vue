<template>
    <main class="overflow-x-hidden">
        <section class="w-screen h-72 pt-16 bg-black flex flex-col gap-y-5 justify-center items-center">
            <h1 class="font-bold sm:text-4xl text-2xl text-white">#stayhome & explore</h1>
            <form 
                @submit.prevent="submitSearchForm" method="get"
                class="flex items-center" 
            >
                <input 
                    type="text" placeholder="Search in shop.." v-model="searchKey"
                    class="p-2 bg-white outline-none rounded-none"
                >
                <button 
                    type="submit"
                    class="bg-blue-600 p-2 text-white flex justify-center items-center"
                >
                    <i class="material-icons">search</i>
                </button>
            </form>
            <div class="flex justify-between items-center w-72 ">
                <div class="relative ">
                    <span 
                        @click="categoryDropdown = !categoryDropdown" 
                        class="hover:text-blue-700 cursor-pointer text-white flex items-center"
                    >
                        Categories<i class="material-icons">expand_more</i>
                    </span>
                    <div 
                        v-if="categoryDropdown"
                        @mouseleave="categoryDropdown = false"
                        class="absolute top-4 sm:-right-12 -right-16 flex items-end h-[220px] w-[200px]"
                    >
                        <ul class="h-[200px] w-[200px] overflow-y-auto shadow-md border z-10" >
                            <li 
                                v-for="(category, index) in item.categories" :key="index"
                                @click="item.filterItemsByCategory(category.id)"
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                {{ category.title }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="relative cursor-pointer" @click="router.push({ path: '/cart' })">
                    <div 
                        v-if="order.cartItems.length !== 0"
                        class="absolute inline-flex items-center justify-center 
                        w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white 
                        rounded-full -top-2 -right-2 dark:border-gray-900"
                    >
                        {{ order.cartItems.length }}
                    </div>
                    <span class="material-icons text-white">shopping_cart_checkout</span>
                </div>
            </div>
        </section>
        <CardBox 
            :items="item.items" 
            :categoryStatus="item.categoryStatus"
            @addToCart="addToCart"
            @getAllItems="item.getAllItems"
        />
        <Paginator 
            v-if="item.PaginatedItems.links"
            :data="item.PaginatedItems"
            @pagination-change-page="item.getItems"
        />
        <Footer />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useItemStore } from '@/stores/item';
import { useOrderStore } from '@/stores/order';
import { Toast } from '@/services/alert';
import type { CartData } from '@/types/order';
import Footer from '../components/Footer.vue';
import CardBox from '../components/shop/CardBox.vue';
import Paginator from '@/components/Paginator.vue';

const auth = useAuthStore();
const item = useItemStore();
const order = useOrderStore();
const router = useRouter();

const searchKey = ref<string>('');
let categoryDropdown = ref<boolean>(false);

const submitSearchForm = () => {
    if(searchKey.value !== '') item.getSearchItems(searchKey.value);
    else item.getAllItems();
}

const addToCart= async(id: number) => {
    if(auth.isAuthenticated){
        let cartData: CartData = { id: id, quantity: 1 };
        await order.addItemsToCart(cartData);
        Toast.fire({
            icon: 'success',
            title: 'Added item to card.'
        });
    }else{
        router.push({ path: '/login'});
        Toast.fire({
            icon: 'info',
            title: 'Please login first.'
        });
    }
}

onMounted(async() => {
    await item.getAllItems();
    await item.getAllCategories();
    await order.getAllCartItems();
})

</script>

