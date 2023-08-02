<template>
    <div class="w-screen relative overflow-x-hidden">
        <div 
            v-if="order.orders.length !== 0"
            class="w-full flex items-center p-5 mt-16"
        >
            <h3 class="text-xl font-extrabold">
                Your Orders
            </h3>
        </div>
        <div 
            v-if="order.orders.length !== 0"
            class="relative overflow-x-auto"
        >
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
                            <span v-if="o.status === OrderStatus.Pending" class="text-yellow-300 font-bold">
                                Pending
                            </span>
                            <span 
                                v-if="o.status === OrderStatus.Accepted || o.status === OrderStatus.Paid" 
                                class="text-blue-500 font-bold"
                            >
                                Accepted
                            </span>
                            <span v-if="o.status === OrderStatus.Done" class="text-gray-500 font-bold">
                                Done
                            </span>
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
        <div 
            v-if="order.orders.length === 0"
            class="w-full h-screen flex flex-col justify-center items-center gap-y-4"
        >
            <h3 class="text-xl font-extrabold" >
                No Orders.
            </h3>
            <button 
                @click="router.push({ path: '/shop' })"
                class="w-64 sm:w-96 py-2 px-3 bg-white hover:bg-blue-200 font-bold border border-1 border-black"
            >
                Continue Shopping
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { OrderElement, OrderStatus } from '@/types/order';

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
    router.push({ path: `/order-detail/${code}` });
}

onMounted(() => {
    order.getAllOrders();
})

</script>

