<template>
    <div class="w-screen relative overflow-x-hidden" v-if="order.items.length !== 0">
        <div 
            class="w-full flex items-center p-5 mt-16"
        >
            <h3 class="text-xl font-extrabold">
                Order Code - {{ order.items[0].order_code }}
            </h3>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price (Ks)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total (Ks)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(item, index) in order.items" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                    >
                        <td class="px-6 py-4">
                            {{ item.product.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.product.price }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.quantity }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.total }}
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                        <td class="px-6 py-4"></td>
                        <td class="px-6 py-4"></td>
                        <td class="px-6 py-4">
                            Final Price
                        </td>
                        <td class="px-6 py-4">
                            {{ order.FinalOrderPrice }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order';

const route = useRoute();
const order = useOrderStore();

onMounted(() => {
    order.getOrderDetail(route.params.code);
})

</script>
