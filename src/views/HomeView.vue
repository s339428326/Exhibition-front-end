<template>
    <main>
        <!-- <TheWelcome />
        <TestToast />
        <TestPopover class="mt-4 mb-4" /> -->
        <div class="container">
            <p class="h1">D3.map area</p>
            <d3map />
        </div>
        <div class="container">
            <div>
                <b-card
                    no-body
                    class="overflow-hidden border-0 mb-40"
                >
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img
                                src="https://fakeimg.pl/356x160/"
                                class="rounded-0 h-100"
                            ></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="專屬你的展覽清單 創建您的藝術之旅">
                                <b-card-text>
                                    通過將喜歡的展覽加入您的清單，您可以快速查看和比較展覽的時間、地點和主題，確保您不會錯過任何一個重要的藝術活動。
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card
                    no-body
                    class="overflow-hidden border-0 mb-40"
                >
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-body title="多元收藏搜尋 尋找獨一無二的藝術珍品">
                                <b-card-text>
                                    專為藝術愛好者和收藏家設計的寶庫。我們為您提供多元的展覽搜尋體驗，不論您對古董、當代藝術還是民族文化感興趣，我們都能滿足您的需求。
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                        <b-col md="6">
                            <b-card-img
                                src="https://fakeimg.pl/356x160/"
                                class="rounded-0 h-100"
                            ></b-card-img>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card
                    no-body
                    class="overflow-hidden border-0 mb-40"
                >
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img
                                src="https://fakeimg.pl/356x160/"
                                class="rounded-0 h-100"
                            ></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="清楚易懂的展覽資訊 讓藝術世界觸手可及">
                                <b-card-text>
                                    我們深知尋找展覽資訊可能是一個繁瑣且耗時的過程，因此我們致力於提供清楚易懂的展覽資訊，讓藝術世界觸手可及。
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card
                    no-body
                    class="overflow-hidden border-0 mb-40"
                >
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-body title="體驗全新的藝術尋覓之旅">
                                <b-card-text>
                                    無論您是追求藝術收藏的高手，還是對藝術有著初生之犢的好奇心，我們將竭誠為您提供多元、個性化的展覽搜索服務。
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                        <b-col md="6">
                            <b-card-img
                                src="https://fakeimg.pl/356x160/"
                                class="rounded-0 h-100"
                            ></b-card-img>
                        </b-col>
                    </b-row>
                </b-card>
            </div>
            <div class="hot-information">
                <div class="hot-title d-flex align-items-center">
                    <h3 class="me-1">熱門展覽資訊</h3>
                    <span>Start-2023</span>
                </div>
                <p>Hot Exhibition information</p>
                <Swiper />
            </div>
        </div>
    </main>
</template>

<style lang="scss">
    $spacer: 1rem !default;
    .mb-40 {
        margin-bottom: $spacer * 2.5;
    }
</style>
<script setup>
    import { onMounted } from 'vue'
    // import TheWelcome from '../components/TheWelcome.vue'
    // import TestToast from '../components/TestToast.vue'
    // import TestPopover from '../components/TestPopover.vue'
    import Swiper from '../components/Swiper.vue'
    import { useExhibitionStore } from '../stores/exhibitionList'

    onMounted(() => {
        const exhibitionStore = useExhibitionStore()
        exhibitionStore.getExhibitionData()
    })
</script>
