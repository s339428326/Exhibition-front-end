<template>
    <div class="">
        {{ sliderIndex }}
    </div>

    <!-- @swiper="onSwiper" :slides-per-view="1"  :space-between="0"-->
    <swiper
        class="col-12 position-relative"
        :modules="[EffectFade]"
        effect="fade"
        :navigation="true"
        :pagination="{ clickable: true }"
        @slideChange="onSlideChange"
    >
        <swiper-slide class="d-flex">
            <div class="user-content rounded-4 p-3 -t-10">
                <!-- user avatar -->
                <img
                    src=""
                    alt=""
                />
                <!-- review -->
            </div>
            <div class="card-end ms-auto position-relative">
                <div
                    class="position-absolute z-3 top-0 start-0 end-0 bottom-0 ms-5 text-white d-flex align-items-end justify-content-end p-4"
                >
                    <div class="w-100 text-end">
                        <h3
                            class="fs-2 font-pathway fw-medium mt-auto pb-2 border-bottom d-inline px-3"
                        >
                            展覽title
                        </h3>
                        <!-- font-pathway -->
                        <p class="fs-1 font-quantum">2023.10.01 ~ 2023.12.31</p>
                    </div>
                </div>
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80"
                    alt=""
                />
            </div>
        </swiper-slide>
        <swiper-slide class="d-flex">
            <div class="user-content border rounded">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas necessitatibus ipsum
                non debitis laudantium voluptas, architecto molestiae saepe possimus. Hic quaerat
                nisi sequi voluptatem porro vitae amet cupiditate nemo dolorum!
            </div>
            <div class="ms-auto">
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2536&q=80"
                    alt=""
                />
            </div>
        </swiper-slide>
        <swiper-slide class="d-flex">
            <div class="user-content border rounded">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas necessitatibus ipsum
                non debitis laudantium voluptas, architecto molestiae saepe possimus. Hic quaerat
                nisi sequi voluptatem porro vitae amet cupiditate nemo dolorum!
            </div>
            <div class="ms-auto">
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                    alt=""
                />
            </div>
        </swiper-slide>
        <swiper-slide class="d-flex">
            <div class="user-content border rounded">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas necessitatibus ipsum
                non debitis laudantium voluptas, architecto molestiae saepe possimus. Hic quaerat
                nisi sequi voluptatem porro vitae amet cupiditate nemo dolorum!
            </div>
            <div class="ms-auto">
                <img
                    class="img-box"
                    src="https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2536&q=80"
                    alt=""
                />
            </div>
        </swiper-slide>
        <PrevBtn
            :class-name="'position-absolute top-50 start-0 translate-middle-y z-1 border-3 rounded-circle p-4 btn border border-success text-success'"
            :is-beginning="isBeginning"
            >pre</PrevBtn
        >
        <NextBtn
            :class-name="'position-absolute top-50 end-0 translate-middle-y z-1  border-3 rounded-circle p-4 btn border border-success text-success'"
            :is-end="isEnd"
            >next</NextBtn
        >
    </swiper>
</template>
<style lang="scss">
    .-t-10 {
        transform: translateX(-10%);
    }

    .img-box {
        width: 600px;
        height: 475px;
        object-fit: cover;
        border-radius: 0.75rem;
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
        position: relative;
        margin-top: auto;
        margin-bottom: auto;
        background-color: white;
        transform: translateX(20%);
        width: 40%;
        height: 70%;
        z-index: 3;
    }
</style>
<script setup>
    import { ref } from 'vue'

    //Swiper default styles
    import 'swiper/scss'
    import 'swiper/scss/effect-fade'

    // Swiper Component
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper modules
    import { EffectFade } from 'swiper/modules'
    //custom swiper button
    import NextBtn from './Swiper/NextBtn.vue'
    import PrevBtn from './Swiper/PrevBtn.vue'

    const isBeginning = ref(true)
    const isEnd = ref(false)
    const sliderIndex = ref(0)

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
