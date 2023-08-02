<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import TopNav from './components/TopNav.vue';
import SideNav from './components/SideNav.vue';

const route = useRoute();

const sideBarStatus = ref<Boolean>(false);

</script>

<template>
    <!-- Top Navigation Bar -->
    <TopNav 
        v-if="route.name !== 'forgotPassword' && route.name !== 'notFound'"
        @toggleSideBar="sideBarStatus = !sideBarStatus" 
    />

    <!-- Side Navigation Bar -->
    <Transition name="side-nav">
        <SideNav v-if="sideBarStatus" @toggleSideBar="sideBarStatus = !sideBarStatus" />
    </Transition>

    <RouterView />

</template>

<style scoped>
.side-nav-enter-from,
.side-nav-leave-to{
    transform: translateX(-256px);
}

.side-nav-enter-to,
.side-nav-leave-from{
    transform: translateX(0px);
}

.side-nav-enter-active,
.side-nav-leave-active{
    transition: all 0.5s ease;
}
</style>
