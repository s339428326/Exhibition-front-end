<template>
    <div class="row gap-4 gap-lg-0">
        <div class="col-12 col-lg-8 h-100 flex-grow-1 order-1 order-lg-0">
            <div
                class="border border-dark d-flex flex-column flex-md-row position-relative h-100 shadow"
            >
                <!-- 標籤  -->
                <div
                    class="position-absolute flag-position py-3 px-2 text-white lh-sm fs-7 bg-dark"
                >
                    精選推薦
                    <p class="fs-2 font-pathway fw-bold"></p>
                </div>
                <div class="">
                    <img
                        class="exhibition-image rounded-start-2"
                        src="https://cloud.culture.tw/e_new_upload/cms/image/A0/B0/C0/D3/E180/F809/eb7f15d4-42cc-4cbb-8c84-ed3b20a6601c.jpg"
                        alt=""
                    />
                </div>
                <div class="d-flex flex-column p-4 flex-grow-1 bg-white">
                    <!-- card head -->
                    <div class="d-flex justify-content-between">
                        <!-- head-start -->
                        <div class="mb-4">
                            <p class="fw-bold fs-5 exhibition-title">
                                【再現或再也不見】台灣石虎及棲地保育暨丘璦珍水彩創作特展
                            </p>
                        </div>
                    </div>
                    <!--card content  -->
                    <p class="exhibition-content">
                        邀您來全臺最漂亮的動物收容所、富有文化特色的客庄大茅埔作客，一起認識臺中市民的好鄰居「石虎」，打卡抽抱枕！
                        2023年續展
                        第一站與第二站_臺中市動物之家后里園區與東勢大茅埔調查團團窩開展啦！
                        臺灣這座美麗島嶼上僅存的唯一原生種貓科動物石虎，估計可能只餘約500隻，且數量還在持續減少，情況非常危急。
                        因此我們這一次將展覽帶進全台最美麗的收容所，邀請喜歡狗狗與貓咪願意走進收容的每一位朋友，也能有機會將關心從伴侶動物保護延伸到野生動物保育。
                        也將展覽帶到有護城河的傳統客家聚落大茅埔庄，「大茅埔調查團」是長期跟我們合作的在地夥伴，因為石虎與淺山聚落的居民距離很近，每一位在地的社區夥伴都是石虎存續與生態保育的最佳後援。
                    </p>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4 flex-grow-1 order-0 order-lg-1 h-100">
            <div class="fw-bold font-pathway shadow-lg p-3 border border-black">
                <p class="fs-1">#1</p>
                <div class="lh-1 border-dark d-inline-block pb-2 d-flex align-items-baseline">
                    <p class="fs-1 pb-2">臺北</p>
                    <p>藝術</p>
                </div>
                <p class="fs-5 mb-1">展覽期間</p>

                <div class="d-flex">
                    <div class="d-flex align-items-baseline lh-1">
                        <p class="border-bottom border-dark fs-large">2023</p>
                        <p>2.23 (一)</p>
                    </div>
                    <ChevronRight size="48" />
                    <div class="d-flex align-items-baseline lh-1">
                        <p class="border-bottom border-dark fs-large">2023</p>
                        <p>2.23 (一)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    defineProps({
        data: Object
    })
</script>
<style lang="scss" scoped>
    .fs-large {
        font-size: 3rem;
    }

    .exhibition-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .exhibition-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
    }

    .exhibition-image {
        max-width: 300px;
        height: 286px;
        object-fit: cover;
        @media screen and (max-width: 768px) {
            max-width: 100%;
        }
    }

    .flag-position {
        max-width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(100% 0, 100% 90%, 50% 100%, 0 90%, 0 0);
        top: -4px;
        left: 20px;
    }
</style>
