<template>
    <swiper
        :slidesPerView="3"
        :spaceBetween="2"
        :navigation="true"
        :modules="modules"
        class="mySwiper px-5"
    >
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

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            return {
                modules: [Navigation]
            }
        }
    }
</script>
