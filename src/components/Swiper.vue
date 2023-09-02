<template>
    <swiper
        :modules="[Navigation]"
        :slides-per-view="3"
        :space-between="50"
        :navigation="true"
        :pagination="{ clickable: true }"
    >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <NextBtn />
        <PrevBtn />
    </swiper>
</template>
<style lang="scss">
    .tag {
        padding: 5px 10px;
        position: absolute;
        border-radius: 0px 0px 30px 0px;
        left: 0;
        top: 0;
        font-size: 18px;
        opacity: 0.8;
    }
    .heart {
        position: absolute;
        padding: 5px;
        right: 5px; /* Adjust the right value as needed */
        top: 5px; /* Adjust the top value as needed */
    }
</style>
<script setup>
    // Swiper Component
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper controller hook
    import { Navigation } from 'swiper/modules'
    import NextBtn from './Swiper/NextBtn.vue'
    import PrevBtn from './Swiper/PrevBtn.vue'

    //Swiper default styles
    import 'swiper/css'
    import 'swiper/css/navigation'
    // const onSwiper = (swiper) => {
    //     console.log(swiper)
    // }
    // const onSlideChange = () => {
    //     console.log('slide change')
    // }
</script>
