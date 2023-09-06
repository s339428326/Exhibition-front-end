<template>
    <div class="d-flex">
        <!-- filter side -->
        <Filter
            :is-filter-show="isFilterShow"
            :filter-show-handler="filterShowHandler"
        />
        <!-- main -->
        <div class="container position-relative px-3">
            <div class="mt-5 rounded-3">
                <!-- 展覽搜索 -->
                <div>
                    <input
                        class="border rounded-1 px-2 py-1"
                        type="search"
                        placeholder="輸入展覽名稱"
                        name=""
                        id=""
                    />
                </div>
                {{ queryData }}
            </div>

            <!-- :class="`btn  d-flex align-items-center gap-2  ${
                    isFilterShow ? 'btn-outline-dark' : 'btn-dark'
                }`" -->
            <button
                class="btn position-absolute top-0 start-0"
                type="button"
                @click="filterShowHandler"
            >
                <FilterMenu />
                <span> 篩選器</span>
            </button>
            <p>篩選器 這裡需要設定 增加樣式</p>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="border position-relative shadow rounded-3 overflow-hidden">
                        <!-- city -->
                        <div
                            class="position-absolute bg-secondary text-white px-3 py-2 border-bottom-end-3"
                        >
                            {{ store.exhibitionList.map((item) => item)[0]?.location.country }}
                        </div>
                        <!-- header -->
                        <div class="rounded">
                            <img
                                class="object-fit-cover"
                                :src="store.exhibitionList.map((item) => item)[0]?.image"
                                alt=""
                            />
                        </div>
                        <!-- exh content -->
                        <div class="p-3">
                            <!-- exh title  -->
                            <div class="fw-bold fs-5">
                                <p>{{ store.exhibitionList.map((item) => item)[0]?.name }}</p>
                            </div>
                            <!-- exh-date -->
                            <div class="d-flex gap-2 mb-1">
                                <span>{{
                                    new Date(
                                        store.exhibitionList.map((item) => item)[0]?.startDate
                                    ).toLocaleDateString()
                                }}</span>
                                <span>~</span>
                                <span>{{
                                    new Date(
                                        store.exhibitionList.map((item) => item)[0]?.endDate
                                    ).toLocaleDateString()
                                }}</span>
                            </div>
                            <!-- exh type -->
                            <ul class="d-flex">
                                <li
                                    class="border py-1 px-2 bg-success text-white rounded-pill fs-7"
                                >
                                    {{ store.exhibitionList.map((item) => item)[0]?.type }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // import _ from 'lodash'
    // import gsap from 'gsap'
    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { exhibitionStore } from '../stores/exhibitionList'
    import Filter from '../components/Filter.vue'
    // import TwoRangeSlider from '../components/TwoRangeSlider.vue'

    const store = exhibitionStore()
    const route = useRoute()

    const queryData = ref()
    const filterExhData = ref()

    const queryDataView = (data) => {
        //排除 初始數據做呈現
        const { city, dateValid, startDate, endDate, maxPrice, minPrice, type } = data
        const newValue = {
            dateValid: dateValid === 'false' ? null : dateValid,
            city: city === 'all' ? null : city,
            startDate: startDate !== '0' ? parseInt(startDate) : null,
            endDate: endDate !== '0' ? parseInt(endDate) : null,
            maxPrice: maxPrice === '100000' ? null : parseInt(maxPrice),
            minPrice: minPrice === '0' ? null : parseInt(minPrice),
            type: type === 'all' ? null : type
        }

        Object.keys(newValue).forEach((keyName) => {
            if (newValue[keyName] === null || newValue[keyName] === undefined)
                delete newValue[keyName]

            if (keyName === 'maxPrice' || keyName === 'minPrice') {
                if (isNaN(newValue[keyName])) {
                    delete newValue[keyName]
                }
            }
        })

        //price 沒有通過篩選 刪除
        if (newValue.maxPrice < newValue.minPrice || newValue.maxPrice > 100000) {
            delete newValue['maxPrice']
            delete newValue['minPrice']
        }

        // console.log('queryDataView', newValue)
        queryData.value = { ...newValue }
    }

    onMounted(() => {
        queryDataView(route.query)
        //篩選data
    })

    watch(route, () => {
        console.log('嘿嘿 , 網址更新囉', route.query)
        queryDataView(route.query)
        //篩選data
    })

    //exhibition Data
    ////////////filter////////////
    const isFilterShow = ref(false)
    const filterShowHandler = () => {
        isFilterShow.value = !isFilterShow.value
    }
</script>

<style lang="scss" scoped>
    //filter slider
    .side {
        overflow: hidden;
        min-width: 288px;
        transition: all 0.25s ease-in;
        background-color: white;
        @media screen and (max-width: 768px) {
            position: absolute;
            min-width: unset;
            top: 0;
            right: 0;
            left: 0;
            z-index: 9999;
        }
    }

    .main-content {
        width: calc(100% - 288px);
    }

    .type-list {
        li:last-child {
            border-bottom: 0px !important;
        }
    }

    .city-list {
        max-height: 380px;
        overflow-y: scroll;
        li:last-child {
            border-bottom: 0px !important;
        }
    }

    .w-0 {
        min-width: 0;
    }

    .border-top-start-1 {
        border-top-left-radius: 0.5rem;
    }

    .border-bottom-end-3 {
        border-bottom-right-radius: 1.5rem;
    }
</style>
