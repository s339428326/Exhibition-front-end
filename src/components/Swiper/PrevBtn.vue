<template>
    <button
        @click="swiper.slidePrev"
        class="btn btn-primary"
    >
        prev
    </button>
</template>
<style lang="scss"></style>
<script setup>
    // Swiper controller hook
    import { useSwiper } from 'swiper/vue'

    const swiper = useSwiper()
    // const swiperSlide = useSwiperSlide()
</script>
