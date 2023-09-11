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
            <RecommendExh class="mb-4" />
            <Top10ExhCard :data="exhibition.exhibitionList" />
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

        <div class="container">
            <div class="row py-5">
                <Swiper />
            </div>
        </div>

        <!-- <section class="container mb-5">
            <div class="row flex-row align-items-center">
                <div class="col-12 col-lg-7">
                    <img
                        class="object-fit-cover w-100"
                        src="../assets/images/home-1.png"
                        alt=""
                    />
                </div>
                <div class="col-12 col-lg-5">
                    <h2 class="fs-4 fw-medium mb-2">專屬你的展覽清單 創建您的藝術之旅</h2>
                    <p class="">
                        通過將喜歡的展覽加入您的清單，您可以快速查看和比較展覽的時間、地點和主題，確保您不會錯過任何一個重要的藝術活動。
                    </p>
                </div>
            </div>
            <div class="row flex-row align-items-center">
                <div class="col-12 col-lg-6">
                    <img
                        class="object-fit-cover w-100"
                        src="../assets/images/home-2.png"
                        alt=""
                    />
                    <div>
                        <h2 class="fs-4 fw-medium mb-2">多元收藏搜尋 尋找獨一無二的藝術珍品</h2>
                        <p class="">
                            專為藝術愛好者和收藏家設計的寶庫。我們為您提供多元的展覽搜尋體驗，不論您對古董、當代藝術還是民族文化感興趣，我們都能滿足您的需求。
                        </p>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <img
                        class="object-fit-cover w-100"
                        src="../assets/images/home-3.png"
                        alt=""
                    />
                    <div>
                        <h2 class="fs-4 fw-medium mb-2">清楚易懂的展覽資訊 讓藝術世界觸手可及</h2>
                        <p class="">
                            我們深知尋找展覽資訊可能是一個繁瑣且耗時的過程，因此我們致力於提供清楚易懂的展覽資訊，讓藝術世界觸手可及。
                        </p>
                    </div>
                </div>
            </div>
        </section> -->
    </main>
</template>

<style lang="scss" scoped>
    .mb-40 {
        margin-bottom: 40px;
    }
</style>
<script setup>
    import { onMounted } from 'vue'
    import Swiper from '../components/Swiper.vue'
    // import { useExhibitionStore } from '../stores/exhibitionList'
    import D3Map from '../components/D3Map.vue'
    import RecommendExh from '../components/HomePage/RecommendExh.vue'
    import TypeSwiper from '../components/HomePage/TypeSwiper/TypeSwiper.vue'
    import Banner3DMenu from '../components/HomePage/Banner3DMenu.vue'
    import Top10ExhCard from '../components/Homepage/Top10ExhCard.vue'

    import { userDataStore } from '../stores/userData'
    import { exhibitionStore } from '../stores/exhibitionList'

    const user = userDataStore()
    const exhibition = exhibitionStore()

    onMounted(async () => {
        await exhibition.getAllExhibitionData()
    })
</script>
