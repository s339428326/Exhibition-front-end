<template>
    <!-- isLoading,meta, name -->
    <button
        class="btn btn-primary w-100"
        type="submit"
        :disabled="isLoading || !meta.valid"
    >
        <template v-if="isLoading === true">
            <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
            ></span>
            <span class="sr-only">Loading...</span>
        </template>
        <template v-else> {{ name }} </template>
    </button>
</template>
<script setup>
    defineProps({
        isLoading: Boolean,
        meta: Object,
        name: String
    })
</script>
<style lang="scss"></style>
