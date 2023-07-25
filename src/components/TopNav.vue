<template>
    <header class="w-screen fixed top-0 left-0 z-50 bg-white">
        <nav class="flex justify-between items-center px-4 py-2 sm:px-12 sm:py-3 shadow-md ">
        
        <h1 
            @click="$router.push({ path: '/'})"
            class="font-bold text-blue-700 text-xl sm:text-3xl cursor-pointer"
        >
            Vue Shop
        </h1>
        
        <div class="flex justify-between gap-x-12" v-if="windowWidth > 768">
            <ul class="flex justify-between items-center text-sm gap-x-4">
                <li class="hover:text-blue-700 cursor-pointer">
                    <RouterLink to="/" active-class="text-blue-800">Home</RouterLink>
                </li>
                <li class="hover:text-blue-700 cursor-pointer">
                    <RouterLink to="/shop" active-class="text-blue-800">Shop</RouterLink>
                </li>
                <li class="hover:text-blue-700 cursor-pointer">
                    <RouterLink to="/cart" active-class="text-blue-800">Cart</RouterLink>
                </li>
                <li class="hover:text-blue-700 cursor-pointer">
                    <RouterLink to="/order" active-class="text-blue-800">Order</RouterLink>
                </li>
                <li class="hover:text-blue-700 cursor-pointer">
                    <RouterLink to="/contact" active-class="text-blue-800">Contact</RouterLink>
                </li>
            </ul>
            <ul 
                class="flex justify-between items-center text-sm gap-x-4"
            >
                <li 
                    v-if="!auth.isAuthenticated"
                    class="hover:text-blue-700 cursor-pointer font-bold"
                >
                    <RouterLink to="/login" active-class="text-blue-800" >
                        Login
                    </RouterLink>
                </li>
                <li 
                    v-if="!auth.isAuthenticated"
                    class="hover:text-blue-700 cursor-pointer font-bold"
                >
                    <RouterLink to="/register" active-class="text-blue-800" >
                        Register
                    </RouterLink>
                </li>
                <li 
                    v-if="auth.isAuthenticated"
                    class="hover:text-blue-700 cursor-pointer font-bold uppercase"
                >
                    {{ auth.user.name }}
                </li>
                <li 
                    v-if="auth.isAuthenticated"
                    @click="accLogout"
                    class="hover:text-blue-700 cursor-pointer font-bold"
                >
                    Logout
                </li>
            </ul>
        </div>

        <div v-else>
            <ul class="flex justify-between items-center sm:gap-x-6 gap-x-4">
                <li 
                    v-if="auth.isAuthenticated"
                    class="w-7 h-7 sm:w-8 sm:h-8 uppercase bg-blue-200 rounded-full 
                        cursor-pointer font-bold flex justify-center items-center"
                >
                    {{ auth.user.name.charAt(0) }}
                </li>
                <li @click="$emit('toggleSideBar')">
                    <span class="material-icons flex items-center">menu</span>
                </li>
            </ul>
        </div>

    </nav>
    </header>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Toast } from '@/services/alert';
import { RouterLink, useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

let windowWidth = ref<number>(window.innerWidth);
let searchDropdown = ref<boolean>(false);

window.addEventListener('resize', function(){
    windowWidth.value = window.innerWidth;
});

const accLogout = async() => {
    await auth.logout();
    if(!auth.isAuthenticated){
        localStorage.removeItem("token"); 
        router.push({ path: '/login' });
        setTimeout(() => {
            Toast.fire({
                icon: 'success',
                title: 'Logged out successfully'
            });
        }, 300);
    }
}

</script>