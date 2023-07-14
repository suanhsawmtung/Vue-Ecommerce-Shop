<template>
    <div class="flex flex-col gap-1">
        <label v-if="label">{{ label }}</label>
        <input 
            class="py-2 px-3 border border-solid border-3 border-gray-400 bg-gray-50"
            :value="modelValue" 
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            v-bind="$attrs"
        >
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label?: String,
    modelValue?: String
}>();

</script>
