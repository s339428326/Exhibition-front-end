<template>
    <!-- @swiper="onSwiper" :slides-per-view="1"  :space-between="0"-->
    <swiper
        class="col-12 position-relative"
        :modules="[EffectFade, Pagination]"
        effect="fade"
        :navigation="true"
        :pagination="pagination"
        @slideChange="onSlideChange"
    >
        <swiper-slide class="swiper-card">
            <div class="user-side border">
                <!-- user avatar -->
                <div class="d-flex gap-4 font-pathway mb-4">
                    <div>
                        <img
                            class="user-avatar"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80"
                            alt="user"
                        />
                    </div>
                    <div class="d-flex flex-column my-auto">
                        <p class="fs-4">Tom</p>
                        <div class="d-flex gap-1">
                            <!-- 整數 -->
                            <Star
                                v-for="(item, index) in Array.from(Array(4).keys())"
                                :key="index"
                            />
                            <!-- 有小數點 -->
                            <StarHalfFull
                                v-for="(item, index) in Array.from(Array(1).keys())"
                                :key="index"
                            />
                        </div>
                    </div>
                </div>
                <!-- review -->
                <div class="review-content">
                    展覽內容相當有趣, 已經很久沒有觀看展覽感謝Art Search Fair
                    平台讓在空閒之餘找到可以找到如此適合放鬆的展覽
                </div>
                <div class="d-flex justify-content-center gap-5">
                    <PrevBtn
                        :class-name="`btn-arrow prev`"
                        :is-beginning="isBeginning"
                    >
                        <ChevronLeft :size="32" />
                    </PrevBtn>
                    <NextBtn
                        :class-name="`btn-arrow next`"
                        :is-end="isEnd"
                    >
                        <ChevronRight :size="32" />
                    </NextBtn>
                </div>
            </div>
            <div class="image-side w-100">
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80"
                    alt=""
                />
                <div class="exhibition-title">
                    <h3 class="exhibition-title__name">視覺設計心碎的聲音</h3>
                    <!-- font-pathway -->
                    <time class="exhibition-title__time">2029.07.08 ~ 2035.08.07</time>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
<style lang="scss">
    :root {
        --swiper-pagination-bullet-horizontal-gap: 0;
        --swiper-pagination-bullet-width: 1rem;
        --swiper-pagination-bullet-inactive-opacity: 1;
        --swiper-pagination-color: #{$success};
        --swiper-pagination-bullet-inactive-color: #{$success};
    }

    .-t-10 {
        transform: translateX(-10%);
    }

    /* position-absolute z-2 top-0 start-0 end-0 bottom-0 border ms-5 */
    .card-end {
        transform: translateX(-15%);
        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: black;
            opacity: 0.2;
            border-radius: 0.5rem;
            z-index: 2;
        }
    }

    .user-content {
        /* position: relative; */
        margin-top: auto;
        margin-bottom: auto;
        border-radius: 1rem;
        background-color: white;
        transform: translateX(20%);
        width: 40%;
        height: 60%;
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
        z-index: 3;
    }

    .user-avatar {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }

    ////////////////////////
    .swiper-card {
        /* border: 1px solid brown; */
        position: relative;
        display: flex;
        flex-direction: row;
        padding-bottom: 8px;
        @media screen and (max-width: 991px) {
            flex-direction: column;
        }
    }

    .user-side {
        order: 0;
        margin-top: auto;
        margin-bottom: auto;
        height: 250px;
        border-radius: 0.75rem;
        padding: 1.25rem;
        background-color: white;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        padding-bottom: 80px;
        transform: translateX(50px);
        position: relative;
        z-index: 3;

        .review-content {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        @media screen and (max-width: 991px) {
            transform: unset;
            order: 1;
        }
    }

    .image-side {
        order: 1;
        position: relative;
        max-width: 600px;
        margin-bottom: 1rem;
        @media screen and (max-width: 991px) {
            max-width: unset;
            order: 0;
        }

        /*  */
        .img-box {
            object-fit: cover;
            border-radius: 0.75rem;
        }

        .exhibition-title {
            font-family: 'Pathway Gothic One', sans-serif;
            text-align: end;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0.8rem;

            .exhibition-title__name {
                font-size: 2rem;
                color: white;
                margin-bottom: 2px;
            }

            .exhibition-title__time {
                font-size: 1.25rem;
                color: white;
            }
        }
    }

    .btn-arrow {
        border-radius: 50%;
        z-index: 20;
        border: none;
        background: transparent;
        color: $primary;
    }

    .swiper-pagination {
        display: flex;
        justify-content: end;
        gap: 8px;
        padding-right: 17rem;
        @media screen and (max-width: 991px) {
            transform: translateY(-450%);
            padding-right: unset;
            justify-content: center;
        }
    }

    .swiper-pagination-bullet {
        border-radius: 1em;
        --swiper-pagination-bullet-width: 0.5rem;
        transition: width 0.3s;
        &.swiper-pagination-bullet-active {
            --swiper-pagination-bullet-width: 1rem;
        }
    }
</style>
<script setup>
    import { ref } from 'vue'

    //Swiper default styles
    import 'swiper/scss'
    import 'swiper/scss/effect-fade'
    import 'swiper/scss/pagination'

    // Swiper Component
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper modules
    import { EffectFade, Pagination } from 'swiper/modules'
    //custom swiper button
    import NextBtn from './Swiper/NextBtn.vue'
    import PrevBtn from './Swiper/PrevBtn.vue'

    const isBeginning = ref(true)
    const isEnd = ref(false)
    const sliderIndex = ref(0)

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${className} border"></div>`
        }
    }

    // const onSwiper = (swiper) => {
    //     console.log('onSwiper', swiper)
    // }

    const onSlideChange = (data) => {
        //emit change
        console.log('slide change', data)
        const { isBeginning: startState, isEnd: endState, activeIndex } = data
        console.log(startState, endState)

        //init slider state
        isBeginning.value = startState
        isEnd.value = endState
        sliderIndex.value = activeIndex
    }
</script>
