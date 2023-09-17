<!-- html -->
<template>
    <div :class="`side border-end ${isFilterShow ? 'w-0' : 'border-none'}`">
        <div :class="`menu m-4 ${isFilterShow && 'd-none'}`">
            <div class="w-100 mb-2 d-block d-md-none">
                <button
                    class="btn border"
                    @click="filterShowHandler"
                >
                    <CloseIcon />
                    <span> Close</span>
                </button>
            </div>
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
                <!-- :checked="" -->
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
                        max="100000"
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
                <p class="fs-7 mb-2 fw-bold">城市 {{ filterData.cityKeyWord }}</p>
                <input
                    @input="searchCityHandler"
                    class="border w-100 rounded px-2 py-1 mb-2"
                    type="search"
                    placeholder="篩選城市名稱"
                    name="cityKeyWord"
                    id="cityKeyWord"
                />
                <ul class="city-list border rounded-3">
                    <li class="p-2 border-bottom">
                        <div @click="filterSetHandler('city', 'all')">
                            <input
                                class="me-2"
                                id="all"
                                type="radio"
                                name="city"
                                value="all"
                                :checked="filterSetData.city === 'all'"
                            />
                            <span for="all">全部</span>
                        </div>
                    </li>
                    <li
                        class="p-2 border-bottom"
                        v-for="(item, index) in filterData.cityArr"
                        :key="index"
                    >
                        <div @click="filterSetHandler('city', item)">
                            <input
                                class="me-2"
                                :id="item"
                                type="radio"
                                name="city"
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
</template>
<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { exhibitionStore } from '../stores/exhibitionList'
    import { useRoute, useRouter } from 'vue-router'

    const props = defineProps({
        isFilterShow: Boolean,
        filterShowHandler: Function,
        resetKeyName: String
    })

    ////////////filter////////////
    //side bar show

    const cityArr = [
        '臺北',
        '新北',
        '桃園',
        '臺中',
        '臺南',
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

    //filter data
    const filterData = ref({
        typeArr: [],
        cityArr,
        cityKeyWord: '',
        typeQuantity: 5
    })

    //exhibition Data
    const store = ref(exhibitionStore())

    //url query
    const route = useRoute()
    const router = useRouter()

    //Filter setting Data
    const filterSetData = ref({
        dateValid: false,
        type: 'all',
        startDate: 0,
        endDate: 0,
        minPrice: 0,
        maxPrice: 100000,
        city: 'all'
    })

    //建立對外監聽事件
    const emit = defineEmits(['reset'])
    watch(props, () => {
        switch (props.resetKeyName) {
            case 'dateValid':
                filterSetData.value.dateValid = false
                emit('reset', 'all')
                break
            case 'type':
                filterSetData.value.type = 'all'
                emit('reset', 'all')
                break
            case 'startDate':
                console.log('startDate')
                filterSetData.value.startDate = 0
                emit('reset', 'all')
                break
            case 'endDate':
                console.log('endDate')
                filterSetData.value.endDate = 0
                emit('reset', 'all')
                break
            case 'minPrice':
                console.log('minPrice')
                filterSetData.value.minPrice = 0
                emit('reset', 'all')
                break
            case 'maxPrice':
                console.log('maxPrice')
                filterSetData.value.maxPrice = 100000
                emit('reset', 'all')
                break
            case 'city':
                console.log('city')
                filterSetData.value.city = 'all'
                emit('reset', 'all')
                break
        }
    })

    //filter data update emit
    const submit = (e) => {
        e.preventDefault()
    }

    onMounted(async () => {
        if (store.value.exhibitionList.length === 0) {
            await store.value.getAllExhibitionData() // 取得展覽全部資料
        }
        initFilterData() //初始化篩選器資料
        console.log('[BeforeMount]', store.value.exhibitionList)
        console.log('[BeforeMount]', route.query)

        watch(filterSetData.value, (newVal) => {
            // emit('update', newVal) // 暫時不使用
            if (typeof filterSetData.value.startDate === 'object') {
                filterSetData.value.startDate = new Date(filterSetData.value.startDate).getTime()
            }
            if (typeof filterSetData.value.endDate === 'object') {
                filterSetData.value.endDate = new Date(filterSetData.value.endDate).getTime()
            }
            router.replace({
                name: 'SearchExhibition',
                query: { ...route.query, ...filterSetData.value }
            })
        })
    })

    //init Filter Data
    const initFilterData = () => {
        //init type data
        filterData.value.typeArr = Array.from(
            new Set(store.value.exhibitionList.map((item) => item.type))
        )

        //query setting
        if (Object.keys(route.query).length > 0) {
            const { dateValid, type, startDate, endDate, minPrice, maxPrice, city } = route.query
            const reSetData = {
                dateValid: dateValid === 'true',
                type,
                startDate: parseInt(startDate),
                endDate: parseInt(endDate),
                minPrice: parseInt(minPrice),
                maxPrice: parseInt(maxPrice),
                city
            }

            filterSetData.value = { ...filterSetData.value, ...reSetData }
        }
    }

    //[Filter setting Data] controller current type value
    const filterSetHandler = (keyName, value) => {
        console.log('click', keyName, value)

        filterSetData.value[`${keyName}`] = value

        console.log('[fetch Data]', 123)
    }

    //[Filter Data] controller
    const searchCityHandler = (e) => {
        e.preventDefault()
        filterData.value.cityKeyWord = e.target.value
        if (e.target.value === '') filterData.value.cityArr = cityArr
        console.log(filterData.value.cityArr.filter((item) => item.includes(e.target.value)))
        filterData.value.cityArr = cityArr.filter((item) => item.includes(e.target.value))
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
</script>
<style lang="scss" scoped>
    .side {
        /* overflow: hidden; */
        min-width: 288px;
        transition: all 0.25s ease-in;
        background-color: white;
        transform: translateX(0%);

        @media screen and (max-width: 768px) {
            position: absolute;
            height: 100vh;
            width: 100%;
            top: 0;
            right: 0;
            left: 0;
            z-index: 9999;
            overflow: scroll;
        }

        @media screen and (max-width: 414px) {
            position: absolute;
            max-height: 667px;
            overflow-y: scroll;
        }
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
        transform: translateX(-100%);
    }
</style>
