<template>
    <swiper
        :slidesPerView="3"
        :spaceBetween="2"
        :navigation="true"
        :modules="modules"
        class="mySwiper px-5"
    >
        <swiper-slide
            v-for="(item, index) in products"
            :key="index"
        >
            <div>
                <b-card
                    overlay
                    :img-src="item.imgSrc"
                    :img-alt="item.imgAlt"
                    class="position-relative"
                >
<<<<<<< HEAD
                    <span class="tag bg-warning fw-bold">{{ item.productArea }}</span>
=======
                    <span class="tag bg-warning fw-bold">台中</span>
>>>>>>> f2097645a000725fc2b1f28223a1a5ccb555fc0f

                    <LikeButton
                        :className="`btn border-0 heart`"
                        :data="{ name: 'test', location: '台中' }"
                        :isLike="isHeartClick"
                        :handler="handlerLike"
                    >
                    </LikeButton>
<<<<<<< HEAD
=======
                </b-card>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div>
                <b-card
                    overlay
                    img-src="https://placekitten.com/900/600"
                    img-alt="Card Image"
                    sub-title="Subtitle"
                    class="position-relative"
                >
                    <span class="tag bg-warning fw-bold">台中</span>
                    <span class="material-symbols-outlined heart"> favorite </span>
                </b-card>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div>
                <b-card
                    overlay
                    img-src="https://placekitten.com/900/600"
                    img-alt="Card Image"
                    sub-title="Subtitle"
                    class="position-relative"
                >
                    <span class="tag bg-warning fw-bold">台中</span>
                    <span class="material-symbols-outlined heart"> favorite </span>
                </b-card>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div>
                <b-card
                    overlay
                    img-src="https://placekitten.com/900/600"
                    img-alt="Card Image"
                    sub-title="Subtitle"
                    class="position-relative"
                >
                    <span class="tag bg-warning fw-bold">台中</span>
                    <span class="material-symbols-outlined heart"> favorite </span>
                </b-card>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div>
                <b-card
                    overlay
                    img-src="https://placekitten.com/900/600"
                    img-alt="Card Image"
                    sub-title="Subtitle"
                    class="position-relative"
                >
                    <span class="tag bg-warning fw-bold">台中</span>
                    <span class="material-symbols-outlined heart"> favorite </span>
>>>>>>> f2097645a000725fc2b1f28223a1a5ccb555fc0f
                </b-card>
            </div>
        </swiper-slide>
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
        right: 0;
        top: 0;
    }
</style>
<script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue'

    // Import Swiper styles
    import 'swiper/css'
    import 'swiper/css/navigation'
    // import './style.css';
    // import required modules
    import { Navigation } from 'swiper/modules'
    import LikeButton from '../components/LikeButton.vue'

    export default {
        components: {
            Swiper,
            SwiperSlide,
            LikeButton
        },
        setup() {
            return {
                modules: [Navigation]
            }
        },
        data() {
            return {
<<<<<<< HEAD
                isHeartClick: false,
                products: [
                    {
                        imgSrc: 'https://placekitten.com/900/600',
                        imgAlt: 'Card Image',
                        productArea: '台中'
                    },
                    {
                        imgSrc: 'https://placekitten.com/900/600',
                        imgAlt: 'Card Image',
                        productArea: '高雄'
                    },
                    {
                        imgSrc: 'https://placekitten.com/900/600',
                        imgAlt: 'Card Image',
                        productArea: '台中'
                    },
                    {
                        imgSrc: 'https://placekitten.com/900/600',
                        imgAlt: 'Card Image',
                        productArea: '高雄'
                    }
                ]
=======
                isHeartClick: false
>>>>>>> f2097645a000725fc2b1f28223a1a5ccb555fc0f
            }
        },
        methods: {
            handlerLike() {
                //demo for HeartIcon to HeartOutlineIcon
                this.isHeartClick = !this.isHeartClick
                console.log(
                    '[Like btn]',
                    this.isHeartClick,
                    this.data,
                    'feature: 等待開發Like FireBase 資料 及 新增 pinia store使用'
                )
            }
        }
    }
</script>
