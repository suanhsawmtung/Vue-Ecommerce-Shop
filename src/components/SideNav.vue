<template>
    <div class="w-64 h-screen pt-16 px-5 overflow-x-hidden bg-white shadow-md fixed top-0 left-0 z-40">
        <ul class="bg-white">
            <li 
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-2 my-2 cursor-pointer"
            >
                <router-link to="/" active-class="text-blue-700">
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">home</i>Home
                    </span>
                </router-link>
            </li>
            <li 
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-1 my-2 cursor-pointer"
            >
                <router-link to="/shop" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">local_mall</i>Shop
                    </span>
                </router-link>
            </li>
            <li 
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-2 my-2 cursor-pointer"
            >
                <router-link to="/contact" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">mail</i>Contact
                    </span>
                </router-link>
            </li>
            <li 
                v-if="!auth.isAuthenticated && localStorage.getItem('token')"
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-1 my-2 cursor-pointer"
            >
                <router-link to="/login" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">login</i>Login
                    </span>
                </router-link>
            </li>
            <li 
                v-if="!auth.isAuthenticated && localStorage.getItem('token')"
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-2 my-2 cursor-pointer"
            >
                <router-link to="/register" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">how_to_reg</i>Register
                    </span>
                </router-link>
            </li>
            <li 
                v-if="auth.isAuthenticated"
                @click="accLogout"
                class="text-xl font-medium py-2 my-2 cursor-pointer"
            >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">logout</i>Logout
                    </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import router from '@/router';

const auth = useAuthStore();

const emit = defineEmits(['toggleSideBar']);

const accLogout = async() => {
    await auth.logout();
    if(!auth.isAuthenticated){
        localStorage.removeItem("token"); 
        emit('toggleSideBar');
        router.push({ path: '/login' });
    }
}

</script>

<style scoped>

</style>