<template>
    <button
        @click="swiper.slideNext()"
        :class="`btn btn-primary  ${isEnd && 'disabled'}`"
    >
        next
    </button>
</template>
<style lang="scss"></style>
<script setup>
    // Swiper controller hook
    import { useSwiper } from 'swiper/vue'
    const swiper = useSwiper()

    defineProps({
        isEnd: Boolean
    })
</script>
