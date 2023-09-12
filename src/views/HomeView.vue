<template>
    <main>
        <div class="container">
            <D3Map />
        </div>

        <section class="container">
            <!-- section title -->
            <h2
                class="fs-3 font-quantum d-inline-block px-4 py-2 mb-3 border border-black shadow-sm font-pathway fw-bold"
            >
                排行 Top 10
            </h2>

            <RecommendExh
                :data="exhibition.exhibitionList"
                :index="recommendViewIndex"
            />
            <Top10ExhCard
                @change-view="recommendViewHandler"
                :data="exhibition.exhibitionList"
            />
        </section>

        <!-- 探索 -->
        <section class="container mb-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2
                    class="fs-3 font-quantum d-inline-block px-4 py-2 mb-3 border border-black shadow-sm font-pathway fw-bold"
                >
                    探索
                </h2>
                <p class="fw-bold">更多資訊</p>
            </div>
            <TypeSwiper />
        </section>

        <!-- <section class="container">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <div class="border-start border-top border-end border-dark p-3">
                        <p>臺中市后里區堤防路370號</p>
                    </div>
                </div>
                <div class="col-12">
                    <div class="border">
                        <ul class="d-flex border border-danger">
                            <li class="border border-info-subtle flex-grow-1">1</li>
                            <li class="border border-info-subtle flex-grow-1">1</li>
                            <li class="border border-info-subtle flex-grow-1">1</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section> -->

        <div class="container">
            <div class="row py-5">
                <Swiper />
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .mb-40 {
        margin-bottom: 40px;
    }
</style>
<script setup>
    import { onMounted, ref } from 'vue'
    import Swiper from '../components/Swiper.vue'
    // import { useExhibitionStore } from '../stores/exhibitionList'
    import D3Map from '../components/D3Map.vue'
    import RecommendExh from '../components/HomePage/RecommendExh.vue'
    import TypeSwiper from '../components/HomePage/TypeSwiper/TypeSwiper.vue'
    import Top10ExhCard from '../components/Homepage/Top10ExhCard.vue'

    import { userDataStore } from '../stores/userData'
    import { exhibitionStore } from '../stores/exhibitionList'

    const user = userDataStore()
    const exhibition = exhibitionStore()

    const recommendViewIndex = ref(null)

    const recommendViewHandler = (val) => {
        console.log(val)
        recommendViewIndex.value = val
    }

    onMounted(async () => {
        await exhibition.getAllExhibitionData()
    })
</script>
