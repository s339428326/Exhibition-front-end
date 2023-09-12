<template>
    <div class="row gap-4 gap-lg-0 mb-4">
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
                        class="exhibition-image"
                        :src="currentData?.image"
                        :alt="currentData?.name"
                    />
                </div>
                <div class="d-flex flex-column p-4 flex-grow-1 bg-white">
                    <!-- card head -->
                    <div class="d-flex justify-content-between">
                        <!-- head-start -->
                        <div class="mb-4">
                            <p class="fw-bold fs-5 exhibition-title">
                                {{ currentData?.name }}
                            </p>
                        </div>
                    </div>
                    <!--card content  -->
                    <p class="exhibition-content">
                        {{ currentData?.introduce }}
                    </p>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4 flex-grow-1 order-0 order-lg-1 h-100">
            <div class="fw-bold font-pathway shadow-lg p-3 border border-black">
                <p class="fs-1"># {{ index + 1 }}</p>
                <div class="lh-1 border-dark d-inline-block pb-2 d-flex align-items-baseline">
                    <p class="fs-1 pb-2">{{ currentData?.location?.country }}</p>
                    <p>{{ currentData?.type }}</p>
                </div>
                <p class="fs-5 mb-1">展覽期間</p>
                <div class="d-flex gap-4">
                    <div class="d-flex flex-column align-items-baseline lh-1">
                        <p class="border-bottom border-dark fs-large">
                            {{ new Date(currentData?.startDate).getFullYear() }}
                        </p>
                        <p>{{ new Date(currentData?.startDate).toLocaleDateString() }}</p>
                    </div>
                    <ChevronRight :size="48" />
                    <div class="d-flex flex-column align-items-baseline lh-1">
                        <p class="border-bottom border-dark fs-large">
                            {{ new Date(currentData?.endDate).getFullYear() }}
                        </p>
                        <p>{{ new Date(currentData?.endDate).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch } from 'vue'
    import { exhibitionStore } from '../../stores/exhibitionList.js'

    const exhibition = exhibitionStore()

    const props = defineProps({
        data: Array,
        currentId: String,
        index: Number
    })

    const currentData = ref()

    watch(props, () => {
        currentData.value = exhibition.exhibitionList.sort(
            (pre, next) => next.viewer - pre.viewer
        )[0]

        if (props.index > 0) {
            currentData.value = props.data[props.index]
        }
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
