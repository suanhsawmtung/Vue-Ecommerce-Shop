<template>
    <main class="overflow-x-hidden">
        <section
            class="w-screen lg:h-screen md:h-120 sm:h-screen h-auto z-0
                flex md:flex-row flex-col justify-between items-center sm:mb-0 mb-6
        ">
            <div class="md:w-6/12 w-full sm:h-2/4 h-96 flex justify-center items-center ">
                <div class="sm:w-4/6 w-5/6 flex flex-col items-start">
                    <h1 class="font-bold sm:text-4xl text-2xl text-blue-800 mb-3">Welcome to Vue Shop</h1>
                    <p class="font-normal text-slate-500 mb-4 text-xs sm:text-base">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Eius atque cupiditate laudantium eligendi quaerat doloribus 
                        ullam vitae sapiente? Sit recusandae minus amet perferendis dolor, 
                        nam dolores provident temporibus commodi quidem!
                    </p>
                    <button 
                        @click="$router.push({ path: '/shop' })"
                        class="bg-blue-700 shadow-sm text-white p-2 w-52 rounded-md flex items-center justify-center gap-x-2"
                    >
                        Shop Now
                        <i class="material-icons">shopping_bag</i>
                    </button>
                </div>
            </div>
            <div class="md:w-6/12 w-full sm:h-2/4 h-64 flex justify-center items-center ">
                <div class="w-4/6">
                    <img src="@/assets/home.svg" alt="">
                </div>
            </div>
        </section>
        <section class="w-screen h-auto bg-gray-100 py-12" >
            <CardBox title="Latest" />
            <CardBox title="Popular Now" />
            <CardBox title="Best Rating" />
            <CardBox title="Just For You" />
        </section>
        <section
            class="w-screen md:h-96 sm:h-half h-auto z-0 mt-6 sm:mt-0
                flex md:flex-row flex-col justify-between items-center 
        ">
            <div class="md:w-6/12 w-full sm:h-2/4 h-full flex justify-center items-center ">
                <div class="sm:w-4/6 w-5/6 flex flex-col items-start">
                    <h1 class="font-bold sm:text-4xl text-2xl text-blue-800 mb-3">Do you need a hand?</h1>
                    <p class="font-normal text-slate-500 mb-4 text-xs sm:text-base">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Eius atque cupiditate laudantium eligendi quaerat doloribus 
                        ullam vitae sapiente?
                    </p>
                    <button 
                        @click="$router.push({ path: '/contact' })"
                        class="bg-blue-700 shadow-sm text-white p-2 w-52 rounded-md flex items-center justify-center gap-x-2"
                    >
                        Get in touch
                        <i class="material-icons">contact_page</i>
                    </button>
                </div>
            </div>
            <div class="md:w-6/12 w-full sm:h-2/4 h-64 flex justify-center items-center ">
                <div class="w-4/6">
                    <img src="@/assets/contact.svg" alt="">
                </div>
            </div>
        </section>
        <Footer />
    </main>
</template>

<script setup lang="ts">
import CardBox from '../components/home/CardBox.vue';
import Footer from '@/components/Footer.vue';

</script>

<style scoped>

</style>