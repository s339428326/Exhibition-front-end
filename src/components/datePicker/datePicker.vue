<template>
    <div>
        <label class="fw-bold">{{ label }}</label>
        <datepicker
            v-model="dateSelected"
            @update:modelValue="updateData"
            placeholder="YYYY-MM-DD"
            :hideInput="false"
        >
        </datepicker>
        {{ dateSelected }}
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    defineProps({
        label: String
    })
    const emit = defineEmits(['update'])

    const dateSelected = ref('')

    const updateData = (newVal) => {
        dateSelected.value = newVal
    }
    watch(dateSelected, async (newVal) => {
        emit('update', newVal)
    })
</script>

<style lang="scss" scoped></style>
