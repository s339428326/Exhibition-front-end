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
        <swiper-slide class="swiper-card col-6">
            <div class="user-side border border-dark">
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
                    展覽經過團隊精心設計後為大家提供不同程度得(單展)甘心及(全票)肝心計畫,
                    可供觀賞者自由參觀不同與以往得展覽模式, 展覽以色調彰顯參與展覽者悸動動不已得心情
                </div>
            </div>

            <!-- -->
            <div class="image-side w-100">
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1533537841959-705741f3d3a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2676&q=80"
                    alt=""
                />
                <div class="exhibition-title">
                    <h3 class="exhibition-title__name">珍 ● 肝 心計畫</h3>
                    <!-- font-pathway -->
                    <time class="exhibition-title__time">2029.07.08 ~ 2035.08.07</time>
                </div>
                <div class="hex-a bg-black text-white d-inline-block px-2">
                    <a
                        class="text-white"
                        href="https://www.hexschool.com/courses/js-training.html"
                    >
                        太無情了, 不要點你會怕!</a
                    >
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
        --swiper-pagination-color: #005f60;
        --swiper-pagination-bullet-inactive-color: #005f60;
    }

    .-t-10 {
        transform: translateX(-10%);
    }

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
        /* border-radius: 1rem; */
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
        gap: 1.5rem;
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
        /* border-radius: 0.75rem; */
        padding: 1.25rem;
        background-color: white;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        padding-bottom: 80px;
        /* transform: translateX(50px); */
        /* position: relative; */
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
            border: 1px solid black;
        }

        .exhibition-title {
            font-family: 'Pathway Gothic One', sans-serif;
            text-align: end;
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 0.8rem;
            background-color: black;
            display: inline-block;
            box-shadow: 0 0 50px 30px black inset;

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
        color: #1a4872;
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

    ///meme
    .image-side {
        overflow: hidden;
    }

    .hex-a {
        transform: translateX(-101%);
        transition: 0.25s;
    }

    .image-side:hover > .hex-a {
        transform: translateX(0%);
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
    // import NextBtn from './Swiper/NextBtn.vue'
    // import PrevBtn from './Swiper/PrevBtn.vue'

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
