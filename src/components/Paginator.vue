<template>
    <div v-if="item.PaginatedItems.last_page !== 1"
        aria-label="Page navigation example" 
        class="w-full mx-auto sm:px-0 px-2 py-4 bg-gray-100"
    >
        <!-- Pagination -->
        <ul class="flex items-center -space-x-px h-10 text-base flex justify-center">

            <!-- Go To The Previous Page -->
            <li 
                @click="changePageEmit(item.PaginatedItems.prev_page_url)"
                :disabled="item.PaginatedItems.current_page === 1"
                class="flex items-center justify-center px-4 h-10 ml-0 leading-tight 
                text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 
                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 cursor-pointer
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
            </li>

            <!-- Click Buttons To Direct Page -->
            <li 
                v-if="item.PaginatedItems" 
                v-for="(link, index) in links" :key="index"
                @click="changePageEmit(link.url)"
                :class="{
                    'bg-blue-200': link.active, 
                    'bg-white': !link.active, 
                    'hover:bg-gray-100': !link.active, 
                    'hover:text-gray-700': !link.active
                }"
                :disabled="link.active"
                class="flex items-center justify-center px-4 h-10 cursor-pointer
                leading-tight text-gray-500 border border-gray-300 
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                dark:hover:bg-gray-700 dark:hover:text-white"
            >
                {{ link.label }}
            </li>

            <!-- Go To The Next Page -->
            <li 
                @click="changePageEmit(item.PaginatedItems.next_page_url)"
                :disabled="item.PaginatedItems.current_page === item.PaginatedItems.last_page"
                class="flex items-center justify-center px-4 h-10 leading-tight 
                text-gray-500 bg-white border border-gray-300 rounded-r-lg cursor-pointer
                hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <span class="sr-only">Next</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
            </li>

        </ul>
        <!-- Pagination End -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useItemStore } from '@/stores/item';
import type { Items, Datum } from '@/types/shop';

const item = useItemStore();

const emit = defineEmits<{
    'pagination-change-page': [page: string],
}>();

const changePageEmit = (url: string | null) => {
    if(url){
        let URL = url.split('api')[1];
        emit('pagination-change-page', URL)
    }
}

const links = computed(() => {
    return item.PaginatedItems.links.slice(1, (item.PaginatedItems.links.length-1));
});


</script>