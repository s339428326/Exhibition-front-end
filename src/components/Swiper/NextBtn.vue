<template>
    <button
        @click="swiper.slideNext()"
        class="btn btn-primary"
    >
        next
        <p>Current slide is {{ swiperSlide.isActive ? 'active' : 'not active' }}</p>
    </button>
</template>
<style lang="scss"></style>
<script setup>
    // Swiper controller hook
    import { useSwiper, useSwiperSlide } from 'swiper/vue'

    const swiper = useSwiper()
    const swiperSlide = useSwiperSlide()
</script>
