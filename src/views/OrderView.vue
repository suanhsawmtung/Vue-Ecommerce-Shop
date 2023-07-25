<template>
    <div class="w-screen relative overflow-x-hidden">
        <div 
            class="w-full flex items-center p-5 mt-16"
        >
            <h3 class="text-xl font-extrabold">
                Your Orders
            </h3>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Items
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price (Ks)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(o, index) in order.orders" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                    >
                        <td class="px-6 py-4">
                            {{ o.order_code }}
                        </td>
                        <td class="px-6 py-4">
                            {{ TotalOrderItems(o) }}
                        </td>
                        <td class="px-6 py-4">
                            {{ o.total_price }}
                        </td>
                        <td class="px-6 py-4">
                            <!-- {{ o.created_at.getTime() }} -->
                        </td>
                        <td class="px-6 py-4">
                            <span v-if="o.status === 0" class="text-yellow-300">Pending</span>
                        </td>
                        <td class="px-6 py-4">
                            <button @click="orderDetail(o.order_code)"
                                type="button" 
                                class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Details
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import type { OrderElement } from '@/types/order';

const router = useRouter();
const order = useOrderStore();

const TotalOrderItems = (o: OrderElement): number => {
    let count = 0;
    o.order_list.forEach(element => {
        count += element.quantity;
    });
    return count;
}

const orderDetail = async(code: string) => {
    router.push({ path: `/detail/${code}` });
}

onMounted(() => {
    order.getAllOrders();
})

</script>

