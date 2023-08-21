<template>
    <div>
        <label
            class="fw-bold"
            for="price-range"
            >{{ label }}</label
        >
        <span class="fw-bold ms-2">{{ value }} TWD</span>
        <b-form-input
            id="price-range"
            v-model="value"
            type="range"
            min="0"
            max="100000"
        ></b-form-input>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    defineProps({
        label: String
    })
    const emit = defineEmits(['update'])
    const value = ref(0)

    watch(value, async (newVal) => {
        emit('update', newVal)
    })
</script>

<style lang="scss" scoped></style>
