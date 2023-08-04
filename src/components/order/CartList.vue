<template>
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Image
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Items
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price(Ks)
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total(Ks)
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Remove
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in cartItems" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                >
                    <td class="px-6 py-4">
                        <img 
                            :src="'http://localhost:8000/storage/products/' + item.product.image" 
                            alt="" class="w-auto h-8 sm:h-12"
                        >
                    </td>
                    <td class="px-6 py-4">
                        {{ item.product.title }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.product.price }}
                    </td>
                    <td class="px-6 py-4 flex items-center">
                        <button 
                            :disabled="item.quantity === 1"
                            @click="$emit('changeQuantity', item, 'minus')"
                            class="w-12 p-1 text-white bg-slate-600 active:bg-slate-500"
                        >
                            <i class="material-icons">remove</i>
                        </button>
                        <input 
                            type="text" v-model="item.quantity" 
                            class="w-12 p-2 text-center border border-black border-1 rounded"
                        >
                        <button 
                            :disabled="item.quantity === item.product.count"
                            @click="$emit('changeQuantity', item, 'plus')"
                            class="w-12 p-1 text-white bg-slate-600 active:bg-slate-500"
                        >
                            <i class="material-icons">add</i>
                        </button>
                    </td>
                    <td class="px-6 py-4">
                        {{ item.product.price * item.quantity }}
                    </td>
                    <td class="px-6 py-4">
                        <button 
                            @click="$emit('deleteCartItem', item.id)"
                            class="w-12 p-1 text-white bg-red-600 active:bg-red-500 flex justify-center items-center rounded"
                        >
                            <i class="material-icons">delete</i>
                        </button>
                    </td>
                </tr>
                <tr 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4"></td>
                    <th class="px-6 py-4 text-gray-700 uppercase bg-gray-50">
                        Final Price
                    </th>
                    <td class="px-6 py-4">
                        {{ finalCartPrice }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types/order';

defineProps<{
    cartItems?: CartItem[],
    finalCartPrice?: number
}>()

</script>

