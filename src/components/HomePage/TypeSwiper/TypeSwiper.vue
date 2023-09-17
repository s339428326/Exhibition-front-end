<template>
    <swiper
        class="position-relative"
        :modules="[Pagination, FreeMode]"
        :slides-per-view="'auto'"
        :space-between="24"
        :navigation="true"
        :free-mode="false"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide
            class="slide border border-dark"
            v-for="(item, index) in swiperData"
            :key="index"
        >
            <router-link
                :to="`/searchExhibition?dateValid=false&type=${item?.title}&startDate=0&endDate=0&minPrice=0&maxPrice=100000&city=all`"
                class="overflow-hidden position-relative d-flex"
            >
                <img
                    class="type-image"
                    :src="item.image"
                    :alt="item.title"
                />
                <div class="bg-type">
                    <p>{{ item.title }}</p>
                </div>
            </router-link>
        </swiper-slide>

        <PrevBtn
            class-name="slider-btn btn btn-light rounded-circle border p-1 position-absolute top-50 start-0 z-3 translate-middle-y"
        >
            <ChevronLeft
                :size="28"
                fillColor="#B7B7B7"
            />
        </PrevBtn>
        <NextBtn
            class-name="slider-btn btn btn-light rounded-circle border p-1 position-absolute top-50 end-0 z-3 translate-middle-y"
        >
            <ChevronRight
                :size="28"
                fillColor="#B7B7B7"
            />
        </NextBtn>
    </swiper>
</template>
<script setup>
    // Swiper Component
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper modules
    import { Pagination, FreeMode } from 'swiper/modules'
    import PrevBtn from '../../Swiper/PrevBtn.vue'
    import NextBtn from '../../Swiper/NextBtn.vue'

    import 'swiper/scss'

    const swiperData = [
        {
            title: '藝文',
            image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
        },
        {
            title: '歷史',
            image: 'https://plus.unsplash.com/premium_photo-1661963996750-24c93354eecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhpc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        },
        {
            title: '教育',
            image: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        },
        {
            title: '生態',
            image: 'https://plus.unsplash.com/premium_photo-1661897401664-ca20addf3e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80'
        }
    ]

    const onSwiper = (swiper) => {
        console.log('onSwiper', swiper)
    }

    const onSlideChange = (data) => {
        //emit change
        console.log('slide change', data)
        const { isBeginning: startState, isEnd: endState, activeIndex } = data
        console.log(startState, endState, activeIndex)

        // //init slider state
        // isBeginning.value = startState
        // isEnd.value = endState
        // sliderIndex.value = activeIndex
    }
</script>
<style lang="scss" scoped>
    .slider-btn {
        width: 42px;
        height: 42px;
    }

    .slide {
        max-width: 280px;
    }

    .type-image {
        width: 100%;
        object-fit: cover;
        height: 125px;
        transition: all 0.25s ease-in;
    }

    .type-image:hover {
        transform: scale(1.25);
        & ~ .bg-type {
            /* top: 0; */
        }
    }

    .bg-type {
        position: absolute;
        /* top: 84px; */
        bottom: 0;
        right: 0;
        left: 0;
        color: white;
        background: #0e0e0eb2;
        z-index: 3;
        font-size: 1.25rem;
        /* border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem; */
        padding: 0.25rem;
        text-align: center;
        transition: all 0.25s ease-in;
    }

    .bg-type:hover {
    }
</style>
