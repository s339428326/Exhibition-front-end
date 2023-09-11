<template>
    <ul class="row">
        <li
            v-for="(item, index) in props.data
                .slice(0, 10)
                .sort((pre, next) => next.viewer - pre.viewer)"
            :key="item.id"
            class="col-12 col-md-6 mb-4"
        >
            <div class="border rank-card overflow-hidden d-flex">
                <div class="bg-dark text-white p-2 font-pathway lh-1">
                    <p>#{{ index + 1 }}</p>
                    <p class="fs-3 border-bottom">{{ new Date(item.startDate).getFullYear() }}</p>
                    <p>
                        {{ new Date(item.startDate).getMonth() }}.{{
                            new Date(item.startDate).getDate()
                        }}~{{ new Date(item.endDate).getMonth() }}.{{
                            new Date(item.endDate).getDate()
                        }}
                    </p>
                </div>
                <div class="flex-grow-1">
                    <div class="border-bottom p-2">
                        <p class="rank-card__title">
                            {{ item.name }}
                        </p>
                    </div>

                    <div class="fw-bold fs-7 p-2">
                        <p class="">點擊率 {{ item.viewer }}</p>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center ms-auto border-start">
                    <button class="btn">
                        <!-- <HeartIcon fillColor="" /> -->
                        <HeartOutlineIcon size="28" />
                    </button>
                </div>
            </div>
        </li>

        <!-- <li
            v-for="(item, index) in props.data
                .slice(0, 10)
                .sort((pre, next) => next.viewer - pre.viewer)"
            :key="index"
        >
            {{ item.name }}
        </li> -->
    </ul>
</template>
<script setup>
    const props = defineProps({
        data: Array
    })
</script>
<style lang="scss" scoped>
    //rank card
    .rank-card__imageBox {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .rank-card__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-weight: 800;
    }
    /* .time {
        color: gray;
        font-size: 14px;
    } */
</style>
