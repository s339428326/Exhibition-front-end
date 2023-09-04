<template>
    <div class="d-flex position-relative">
        <!-- filter side -->
        <div :class="`side border-end ${isFilterShow ? 'w-0' : 'border-none'}`">
            <div :class="`m-4 ${isFilterShow && 'd-none'}`">
                <!-- header -->
                <div
                    @click="filterSetHandler('dateValid', !filterSetData.dateValid)"
                    class="d-flex gap-2 align-items-center border-bottom pb-4 mb-4 px-3"
                >
                    <input
                        id="date-valid"
                        type="checkbox"
                        name="checkbox"
                        :checked="filterSetData.dateValid"
                    />
                    <!--  -->
                    <p
                        for="date-valid"
                        class="pb-1"
                    >
                        顯示已結束展覽
                    </p>
                </div>
                <!-- Type -->
                <div class="mb-3">
                    <p class="fw-bold mb-2">類型</p>
                    <!-- component radioList -->
                    <ul class="type-list rounded-3 border mb-1">
                        <li class="border-bottom p-2">
                            <div @click="filterSetHandler('type', 'all')">
                                <input
                                    class="me-2"
                                    id="type-all"
                                    type="radio"
                                    name="type"
                                    value="all"
                                    :checked="filterSetData.type === 'all'"
                                />
                                <span for="type-all">全部</span>
                            </div>
                        </li>
                        <li
                            class="p-2 border-bottom"
                            v-for="(item, index) in filterData.typeArr.slice(
                                0,
                                filterData.typeQuantity
                            )"
                            :key="index"
                        >
                            <div @click="filterSetHandler('type', item)">
                                <input
                                    class="me-2"
                                    :id="item"
                                    type="radio"
                                    name="type"
                                    :value="item"
                                    :checked="filterSetData.type === item"
                                />
                                <span
                                    class=""
                                    :for="item"
                                >
                                    {{ item }}</span
                                >
                            </div>
                        </li>
                    </ul>
                    <div class="d-flex px-1">
                        <button
                            :class="`border-0 bg-transparent fw-bold ${
                                filterData.typeQuantity < 6 && 'd-none'
                            }`"
                            type="button"
                            @click="typeQtyHandler('reset')"
                        >
                            收回
                        </button>
                        <button
                            @click="typeQtyHandler('add')"
                            :class="`border-0 bg-transparent fw-bold ms-auto ${
                                filterData.typeArr.length < 5 && 'd-none'
                            }`"
                            type="button"
                        >
                            顯示更多
                        </button>
                    </div>
                </div>
                <!-- Time -->
                <div class="mb-2">
                    <p class="fw-bold mb-2">展覽期間</p>
                    <DatePicker
                        v-model="filterSetData.startDate"
                        class="mb-2"
                        type="number"
                        placeholder="開始時間"
                    />

                    <!--  v-model="filterSetData.startDate" -->
                    <DatePicker
                        placeholder="結束時間"
                        v-model="filterSetData.endDate"
                    />
                </div>
                <!-- price two range -->
                <p class="mb-2 fw-bold">價格</p>
                <VeeForm
                    v-slot="{ errors }"
                    @submit="submit"
                >
                    <div class="d-flex flex-column">
                        <p class="mb-1 fs-7">最小票價</p>
                        <VeeField
                            v-model="filterSetData.minPrice"
                            :class="`border rounded py-1 px-2 ${
                                errors[`最小價格`] ? 'border-danger' : 'border'
                            }`"
                            placeholder="最小價格"
                            name="最小價格"
                            type="number"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            :rules="{
                                min_value: 0,
                                max_value: filterSetData.maxPrice,
                                numeric: true
                            }"
                        />
                        <ErrorMessage
                            v-if="errors[`最小價格`]"
                            as="p"
                            class="text-danger errorMessage"
                            name="最小價格"
                        />
                        <p
                            v-else
                            class="errorMessage"
                        ></p>
                    </div>
                    <div class="d-flex flex-column">
                        <p class="mb-1 fs-7">最大票價</p>
                        <VeeField
                            v-model="filterSetData.maxPrice"
                            :class="`border rounded py-1 px-2 ${
                                errors[`最大價格`] ? 'border-danger' : 'border'
                            }`"
                            placeholder="最大價格"
                            name="最大價格"
                            type="number"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            :rules="{
                                min_value: filterSetData.minPrice,
                                max_value: 100000,
                                numeric: true
                            }"
                        />
                        <ErrorMessage
                            v-if="errors[`最大價格`]"
                            as="p"
                            class="text-danger errorMessage"
                            name="最大價格"
                        />
                        <p
                            v-else
                            class="errorMessage"
                        ></p>
                    </div>
                </VeeForm>
                <!-- 地區 -->
                <div>
                    <p class="fs-7 mb-2 fw-bold">城市</p>
                    <input
                        class="border w-100 rounded px-2 py-1 mb-2"
                        type="search"
                        placeholder="篩選城市名稱"
                        name=""
                        id=""
                    />

                    <ul class="city-list border rounded-3">
                        <li
                            class="p-2 border-bottom"
                            v-for="(item, index) in cityArr"
                            :key="index"
                        >
                            <div @click="filterSetHandler('city', item)">
                                <input
                                    class="me-2"
                                    :id="item"
                                    type="radio"
                                    name="type"
                                    :value="item"
                                    :checked="filterSetData.city === item"
                                />
                                <span
                                    class=""
                                    :for="item"
                                >
                                    {{ item }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- main -->
        <div class="container">
            <button
                type="button"
                @click="filterShowHandler"
            >
                Filter
                {{ isFilterShow }}
            </button>
            {{ new Date(filterSetData.endDate) }}
            <p>篩選器 {{ filterSetData }}</p>
            <p>展覽資料 {{ store.exhibitionList.map((item) => item.location.country) }}</p>
        </div>
    </div>
</template>

<script setup>
    // import TwoRangeSlider from '../components/TwoRangeSlider.vue'

    import { ref, watch, onMounted } from 'vue'
    import { exhibitionStore } from '../stores/exhibitionList'
    import { useRoute, useRouter } from 'vue-router'

    const submit = (e) => {
        e.preventDefault()
    }

    //exhibition Data
    const store = ref(exhibitionStore())

    const cityArr = [
        '臺北',
        '新北',
        '桃園',
        '臺中',
        '台南',
        '高雄',
        '新竹',
        '苗栗',
        '彰化',
        '南投',
        '雲林',
        '嘉義',
        '屏東',
        '宜蘭',
        '花蓮',
        '臺東',
        '澎湖',
        '金門',
        '連江',
        '基隆'
    ]

    //url query
    const route = useRoute()
    const router = useRouter()

    ////////////filter////////////
    //side bar show
    const isFilterShow = ref(false)
    const filterShowHandler = () => {
        isFilterShow.value = !isFilterShow.value
    }

    onMounted(async () => {
        if (store.value.exhibitionList.length === 0) {
            await store.value.getAllExhibitionData() // 取得展覽全部資料
        }
        initFilterData() //初始化篩選器資料
        console.log('[BeforeMount]', store.value.exhibitionList)
    })

    //filter data
    const filterData = ref({
        typeArr: [],
        typeQuantity: 5
    })

    //Filter setting Data
    const filterSetData = ref({
        dateValid: false,
        type: 'all',
        startDate: 0,
        endDate: new Date().getTime() + 365 * 24 * 60 * 60 * 100,
        minPrice: 1,
        maxPrice: 100000,
        city: 'all'
    })

    //init Filter Data
    const initFilterData = () => {
        //init type data
        filterData.value.typeArr = Array.from(
            new Set(store.value.exhibitionList.map((item) => item.type))
        )
        console.log('[init]')
    }

    //[Filter type] controller current type value
    const filterSetHandler = (keyName, value) => {
        console.log('click', keyName, value)
        filterSetData.value[`${keyName}`] = value
    }

    //[Filter type] show Quantity
    const typeQtyHandler = (controller) => {
        switch (controller) {
            case 'add':
                filterData.value.typeQuantity += 5
                break
            case 'reset':
                filterData.value.typeQuantity = 5
                break
        }
    }

    //watch filterData to fetch api.
    watch(filterSetData.value, (newValue) => {
        console.log('[Fetch Filter Data]', newValue)
        console.log(typeof filterSetData.value.startDate, filterSetData.value.startDate)

        if (typeof filterSetData.value.startDate === 'object') {
            filterSetData.value.startDate = new Date(filterSetData.value.startDate).getTime()
        }

        if (typeof filterSetData.value.endDate === 'object') {
            filterSetData.value.endDate = new Date(filterSetData.value.endDate).getTime()
        }

        console.log('change', filterSetData.value)
        router.replace({
            name: 'SearchExhibition',
            query: newValue
        })
    })
</script>

<style lang="scss">
    //filter slider
    .side {
        overflow: hidden;
        min-width: 288px;
        transition: all 0.25s ease-in;
        background-color: white;

        @media screen and (min-width: 1608px) {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
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
</style>
