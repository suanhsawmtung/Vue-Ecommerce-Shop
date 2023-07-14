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
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="w-52 h-20 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="flex justify-center items-center pb-8">
                        <div class="sm:w-52 sm:h-60 w-40 h-52 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                            <div class="sm:w-52 w-40 sm:h-40 h-36 bg-red-100"></div>
                            <div class="sm:w-52 w-40 sm:h-20 h-16 bg-blue-200"></div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        </div>
    </article>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// import Swiper core and required modules
import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

defineProps<{
    title?: String,
}>();

const modules = [ FreeMode, Pagination ];

</script>