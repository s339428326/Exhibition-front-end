<template>
    <button
        @click="swiper.slidePrev"
        :class="`${className} ${isBeginning && 'disabled'} `"
    >
        <slot></slot>
    </button>
</template>
<style lang="scss"></style>
<script setup>
    // Swiper controller hook
    import { useSwiper } from 'swiper/vue'

    const swiper = useSwiper()

    defineProps({
        isBeginning: Boolean,
        className: String
    })
</script>
