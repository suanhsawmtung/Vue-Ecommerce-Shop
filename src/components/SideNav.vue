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
                class="text-xl font-medium py-1 my-2 cursor-pointer"
            >
                <router-link to="/cart" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">shopping_cart</i>Cart
                    </span>
                </router-link>
            </li>
            <li 
                @click="$emit('toggleSideBar')"
                class="text-xl font-medium py-1 my-2 cursor-pointer"
            >
                <router-link to="/order" active-class="text-blue-700" >
                    <span class="flex items-center gap-x-3">
                        <i class="material-icons">list_alt</i>Order
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
                v-if="!auth.isAuthenticated "
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
                v-if="!auth.isAuthenticated "
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
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Toast } from '@/services/alert';
import { removeTokenFromCookie } from '@/services/cookie';

const auth = useAuthStore();
const router = useRouter();

const emit = defineEmits(['toggleSideBar']);

const accLogout = async() => {
    await auth.logout();
    if(!auth.isAuthenticated){
        removeTokenFromCookie(); 
        emit('toggleSideBar');
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
