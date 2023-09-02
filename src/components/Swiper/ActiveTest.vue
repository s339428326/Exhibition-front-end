<template>
    <p>Current slide is {{ swiperSlide.isActive ? 'active' : 'not active' }}</p>
</template>
<style lang="scss"></style>
<script setup>
    // Swiper controller hook
    import { useSwiperSlide } from 'swiper/vue'

    const swiperSlide = useSwiperSlide()
</script>
