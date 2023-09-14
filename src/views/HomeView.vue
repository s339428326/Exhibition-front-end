<template>
    <main>
        <!-- Map banner -->
        <div class="container">
            <D3Map />
        </div>

        <!--  排行 Top 10 -->
        <section class="container">
            <h2
                class="fs-3 font-quantum d-inline-block px-4 py-2 mb-3 border border-black shadow-sm font-pathway fw-bold"
            >
                排行 Top 10
            </h2>

            <RecommendExh
                :data="exhibition.exhibitionList"
                :index="recommendViewIndex"
            />
            <Top10ExhCard @change-view="recommendViewHandler" />
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
        <!-- meme block -->
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
    import D3Map from '../components/D3Map.vue'
    import RecommendExh from '../components/HomePage/RecommendExh.vue'
    import TypeSwiper from '../components/HomePage/TypeSwiper/TypeSwiper.vue'
    import Top10ExhCard from '../components/Homepage/Top10ExhCard.vue'

    // import { userDataStore } from '../stores/userData'
    import { exhibitionStore } from '../stores/exhibitionList'

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
