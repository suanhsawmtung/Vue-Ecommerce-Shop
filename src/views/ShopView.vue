<template>
    <main class="overflow-x-hidden">
        <section class="w-screen h-72 pt-16 bg-black flex flex-col gap-y-5 justify-center items-center">
            <h1 class="font-bold sm:text-4xl text-2xl text-white">#stayhome & explore</h1>
            <div 
                class="flex items-center" 
            >
                <input type="text" class="p-2 bg-white outline-none rounded-none" placeholder="Search in shop..">
                <button class="bg-blue-600 p-2 text-white flex justify-center items-center">
                    <i class="material-icons">search</i>
                </button>
            </div>
            <div class="flex justify-between items-center w-72 ">
                <div class="relative ">
                    <span 
                        @mouseenter="categoryDropdown = true" @mouseleave="categoryDropdown = false"
                        @click="categoryDropdown = !categoryDropdown" 
                        class="hover:text-blue-700 cursor-pointer text-white flex items-center"
                    >
                        Categories<i class="material-icons">expand_more</i>
                    </span>
                    <div 
                        v-if="categoryDropdown"
                        @mouseenter="categoryDropdown = true" @mouseleave="categoryDropdown = false"
                        class="absolute top-4 -right-12 flex items-end h-[220px] w-[200px]"
                    >
                        <ul class="h-[200px] w-[200px] overflow-y-auto shadow-md border z-10" >
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                            <li 
                                class="bg-white px-2 py-3 border-bottom border-b-2 border-solid border-gray-300 hover:text-blue-700 cursor-pointer"
                            >
                                T-Shirt
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="cursor-pointer" @click="$router.push({ path: '/cart' })">
                    <span class="material-icons text-white">shopping_cart_checkout</span>
                </div>
            </div>
        </section>
        <CardBox />
        <Footer />
    </main>
</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue';
import CardBox from '../components/shop/CardBox.vue';
import { ref } from 'vue';

let categoryDropdown = ref<boolean>(false);

</script>

<style scoped>

</style>