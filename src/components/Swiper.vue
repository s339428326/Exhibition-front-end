<template>
    <swiper
        :modules="[]"
        :slides-per-view="3"
        :space-between="50"
        :navigation="true"
        :pagination="{ clickable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <PrevBtn :is-beginning="isBeginning" />
        <NextBtn :is-end="isEnd" />
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
    import { ref } from 'vue'
    // Swiper Component
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper controller hook
    import { Navigation } from 'swiper/modules'
    import NextBtn from './Swiper/NextBtn.vue'
    import PrevBtn from './Swiper/PrevBtn.vue'
    // import ActiveTest from './Swiper/ActiveTest.vue'

    const isBeginning = ref(true)
    const isEnd = ref(false)

    //Swiper default styles
    import 'swiper/css'
    const onSwiper = (swiper) => {
        console.log(swiper)
    }
    const onSlideChange = (data) => {
        //emit change
        console.log('slide change', data)
        const { isBeginning: startState, isEnd: endState } = data
        console.log(startState, endState)
        isBeginning.value = startState
        isEnd.value = endState
    }
</script>
