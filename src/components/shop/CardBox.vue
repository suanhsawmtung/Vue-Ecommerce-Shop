<template>
    <section class="w-screen py-5 bg-gray-100">
        <div 
            v-if="categoryStatus === 'All'"
            class="sm:w-5/6 w-full mx-auto sm:px-0 px-2"
        >
            <h1 class="font-bold sm:text-3xl text-xl text-blue-800 mb-6">
                {{ categoryStatus }} Items
            </h1>
        </div>
        <div 
            v-else
            class="sm:w-5/6 w-full mx-auto sm:px-0 px-2 
            flex sm:flex-row flex-col  mb-4 sm:gap-0 gap-2
            sm:justify-between sm:items-center items-start"
        >
            <h1 class="font-bold sm:text-3xl sm:text-xl text-md text-blue-800 capitalize">
                Shop By {{ categoryStatus }} 
                <span v-if="categoryStatus !== 'Search'">Category</span>
            </h1>
            <button 
                v-if="categoryStatus !== 'Search'"
                type="button" @click="$emit('getAllItems')"
                class="px-3 py-2 text-sm font-medium text-center 
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                All Items
            </button>
        </div>
        <div class="sm:w-5/6 w-full sm:px-0 px-2 h-auto grid-cols-auto-two
                    grid sm:grid-cols-auto-one gap-x-2 mx-auto"
        >
            <div 
                class="flex justify-center items-center hover:scale-105 duration-150 cursor-pointer" 
                v-for="(item, index) in items" :key="index"
                @click="router.push({ path: `/item/${item.id}` })"
            >
                <div class="w-52 h-60 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                    <div class="w-full h-40 bg-white overflow-hidden">
                        <img 
                            :src="'https://nooneuse.shop/storage/products/' + item.image" 
                            class="w-full h-full object-contain"
                            alt=""
                        >
                    </div>
                    <div class="w-full h-20 bg-blue-200 p-2">
                        <p class="overflow-hidden whitespace-nowrap text-sm">{{ item.title }}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex flex-col">
                                <span class="text-sm text-orange-500">
                                    {{ item.price }} Ks
                                </span>
                                <span class="text-sm">{{ item.count }} left.</span>
                            </div>
                            <span 
                                class="w-8 h-8 bg-white hover:scale-105 active:scale-75 duration-150
                                    flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <i class="material-icons text-md">add_shopping_cart</i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Datum } from '@/types/shop';

defineProps<{
    items?: Datum[],
    categoryStatus?: string,
}>();

const router = useRouter();

</script>