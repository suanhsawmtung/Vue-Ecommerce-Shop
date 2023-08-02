<template>
    <article class="w-5/6 mx-auto overflow-x-hidden mb-12 ">
        <h1 class="font-bold sm:text-3xl text-xl text-blue-800 mb-6">{{ title }}</h1>
        
        <div class="flex justify-center items-center">
            <Swiper
                :free-mode="true"
                :pagination="{
                    clickable: true,
                }"
                :breakpoints="{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 8,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 8,
                    }
                }"
                :modules="modules"
                class="mySwiper"
            >
                <SwiperSlide v-for="(item, index) in items" :key="index">
                    <div 
                        @click="router.push({ path: `/item/${item.id}`})"
                        class="flex justify-center items-center pb-8 cursor-pointer
                            hover:scale-105 duration-150 active:scale-95"
                    >
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-white">
                                <img 
                                    :src="'http://localhost:8000/storage/products/' + item.image" 
                                    class="w-full h-full object-contain" alt=""
                                >
                            </div>
                            <div class="w-full h-20 bg-blue-200 p-2">
                                <p class="overflow-hidden whitespace-nowrap text-sm">{{ item.title }}</p>
                                <div class="flex justify-between items-center sm:mt-3 mt-1">
                                    <span class="text-sm text-orange-500">
                                        {{ item.price }} Ks
                                    </span>
                                    <span 
                                        class="w-6 h-6 bg-white hover:scale-105 active:scale-75 duration-150
                                            flex justify-center items-center rounded-full cursor-pointer"
                                    >
                                        <i class="material-icons text-base">add_shopping_cart</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        </div>
    </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// import Swiper core and required modules
import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Datum } from '@/types/shop';

defineProps<{
    title?: String,
    items?: Datum[]
}>();

const router = useRouter();

const modules = [ FreeMode, Pagination ];

</script>