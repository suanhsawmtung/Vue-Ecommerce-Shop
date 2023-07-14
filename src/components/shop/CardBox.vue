<template>
    <section class="w-screen py-5 bg-gray-100">
        <div class="sm:w-5/6 w-full sm:px-0 px-2 h-auto grid-cols-auto-two
                    grid sm:grid-cols-auto-one gap-x-2 mx-auto"
        >
            <div class="flex justify-center items-center" v-for="(card, index) in 12" :key="index">
                <div class="w-52 h-60 drop-shadow-md mb-4 rounded-lg overflow-hidden">
                    <div class="w-52 h-40 bg-red-100"></div>
                    <div class="w-52 h-20 bg-blue-200"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>