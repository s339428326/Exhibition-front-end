<template>
    <button
        @click="swiper.slideNext()"
        :class="`${className} ${isEnd && 'disabled'}`"
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
        isEnd: Boolean,
        className: String
    })
</script>
