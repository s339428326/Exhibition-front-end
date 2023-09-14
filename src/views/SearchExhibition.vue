<template>
    <div class="d-flex">
        <!-- filter side -->
        <Filter
            :is-filter-show="isFilterShow"
            :filter-show-handler="filterShowHandler"
            :resetKeyName="resetKeyName"
            @reset="resetTypeStr"
        />
        <!-- main -->
        <div class="container position-relative px-3">
            <div class="mt-5 rounded-3">
                <h1 class="fw-bold font-pathway fs-4">展覽檢索</h1>
                <p class="font-pathway fw-bold fs-3 mb-2">Exhibition Search</p>
                <!-- 展覽搜索 -->
                <div class="d-flex flex-wrap gap-4 mb-2 border p-3 rounded-3 border-dark">
                    <button
                        class="btn btn-primary fs-7 d-flex flex-wrap justify-content-center"
                        type="button"
                        @click="filterShowHandler"
                    >
                        <FilterMenu />
                        <span> 篩選器</span>
                    </button>

                    <div class="d-flex flex-column gap-1 flex-grow-1 justify-content-center">
                        <input
                            @input="searchKeyWordHandler"
                            class="search-keyword border rounded-1 px-2 py-1"
                            type="search"
                            placeholder="輸入展覽名稱"
                        />
                    </div>
                </div>
                <!-- filter tag-->
                <div class="d-flex gap-2 mb-4">
                    <div
                        class="d-flex gap-2 align-items-center fs-7 border bg-transparent p-1 rounded"
                        v-for="(item, key, index) in queryData"
                        :key="index"
                    >
                        <!-- clear button -->
                        <button
                            class="p-0 border-0 bg-transparent"
                            @click="resetFilterSetHandler(key)"
                        >
                            <CloseIcon :size="18" />
                        </button>
                        <!-- filter tag name -->
                        <p class="">
                            {{ `${key === 'dateValid' ? `顯示結束展覽` : ''}` }}
                            {{
                                `${
                                    key === 'startDate'
                                        ? `始於 ${new Date(item).toLocaleDateString()}`
                                        : ''
                                }`
                            }}
                            {{
                                `${
                                    key === 'endDate'
                                        ? `結束 ${new Date(item).toLocaleDateString()}`
                                        : ''
                                }`
                            }}
                            {{ `${key === 'type' ? `類別 ${item}` : ''}` }}
                            {{ `${key === 'minPrice' ? `最小價格 ${item}` : ''}` }}
                            {{ `${key === 'maxPrice' ? `最大價格 ${item}` : ''}` }}
                            {{ `${key === 'city' ? `城市 ${item}` : ''}` }}
                        </p>
                    </div>
                </div>
                <div class="mb-2">
                    <p :class="`fs-7 ${!searchKeyWord.length > 0 && 'd-none'}`">
                        搜索關鍵字：{{ searchKeyWord }}
                    </p>
                    <p class="fs-7">總搜索筆數({{ exhViewData.length }})</p>
                </div>
            </div>
            <!-- 篩選器 控制btn -->

            <!-- 展覽卡片 -->
            <div class="row">
                <div
                    v-for="(item, index) in exhViewData.slice(
                        page.limit * (page.currentPage - 1),
                        page.limit * page.currentPage
                    )"
                    :key="index"
                    class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                >
                    <div class="border position-relative shadow rounded-3 overflow-hidden">
                        <!-- city -->
                        <div
                            class="position-absolute bg-secondary text-white px-3 py-2 border-bottom-end-3"
                        >
                            {{ item?.location.country }}
                        </div>
                        <!-- header -->
                        <router-link
                            class="text-dark rounded"
                            :to="`viewExhibition/${item?.id}`"
                        >
                            <img
                                class="image-box hover-scale"
                                :src="item?.image"
                                :alt="item.name"
                            />
                        </router-link>
                        <!-- exh content -->
                        <div class="p-3">
                            <!-- exh title  -->
                            <div class="card-title fw-bold">
                                <router-link
                                    class="text-dark"
                                    :to="`viewExhibition/${item?.id}`"
                                >
                                    <p>{{ item?.name }}</p>
                                </router-link>
                            </div>
                            <!-- exh-date -->
                            <div class="d-flex gap-2 mb-1">
                                <span>{{ new Date(item?.startDate).toLocaleDateString() }}</span>
                                <span>~</span>
                                <span>{{ new Date(item?.endDate).toLocaleDateString() }}</span>
                            </div>
                            <!-- exh type -->
                            <ul class="d-flex">
                                <li
                                    class="border py-1 px-2 bg-success text-white rounded-pill fs-7"
                                >
                                    {{ item?.type }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分頁元件 -->
            <nav class="d-flex justify-content-center gap-1 mt-5 mb-5">
                <button
                    @click="pageCountHandler('pre')"
                    class="p-1 border border-1 rounded bg-transparent"
                >
                    <ChevronLeft />
                    <span>返回</span>
                </button>
                <!--  -->
                <ul class="pagination d-flex gap-1">
                    <!-- page number -->
                    <!-- <li class="border p-2 rounded">1</li> -->
                    <li
                        @click="pageHandler(item + 1)"
                        v-for="(item, index) in pageList"
                        :key="index"
                        :class="`border p-2 rounded ${
                            page.currentPage === item + 1 && ' bg-primary text-white'
                        }`"
                    >
                        <button
                            :class="`border-0 bg-transparent ${
                                page.currentPage === item + 1 && '  text-white'
                            }`"
                        >
                            {{ item + 1 }}
                        </button>
                    </li>
                </ul>

                <button
                    @click="pageCountHandler('next')"
                    class="p-1 border border-1 rounded bg-transparent"
                >
                    <ChevronRight />
                    <span>更多</span>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
    // import gsap from 'gsap'
    import _ from 'lodash'
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
    import { useRoute, useRouter, RouterLink } from 'vue-router'
    import { exhibitionStore } from '../stores/exhibitionList'
    import Filter from '../components/Filter.vue'
    // import TwoRangeSlider from '../components/TwoRangeSlider.vue'

    const store = exhibitionStore()
    const route = useRoute()
    const router = useRouter()

    const searchKeyWord = ref('')
    const queryData = ref()
    const resetKeyName = ref('')
    const exhViewData = ref([...store.exhibitionList])

    const page = ref({
        nextBtnDisable: false,
        counter: 0, // 記錄是第幾Round切換 page list
        pageView: 3, //每次顯示 X 頁 btn 顯示於畫面
        limit: 8, // 每頁有幾筆資料
        currentPage: 1 //目前顯示資料的頁數
    })
    const pageList = ref([])

    /////////////////page components////////////////////

    //page change handler
    const pageHandler = (currentPage) => {
        page.value.currentPage = currentPage
    }

    const pageCountHandler = (key) => {
        //算出 總數 除以 每頁顯示資料筆數, 是否有餘數
        const roundMod = exhViewData.value.length % page.value.limit > 0 ? 1 : 0
        //總數除以 每頁顯示資料筆數, 無條件捨去 + roundMod
        const maxPage = Math.floor(exhViewData.value.length / page.value.limit) + roundMod
        //兩相加得出 總共 page 切換可以換幾Round
        const roundClickCounter = Math.ceil(maxPage / page.value.pageView)

        switch (key) {
            case 'next':
                if (page.value.counter + 1 >= roundClickCounter) return
                console.log(page.value.counter, roundClickCounter)
                page.value.counter++
                page.value.currentPage = page.value.counter * page.value.pageView + 1
                break
            case 'pre':
                if (page.value.counter === 0) return
                page.value.counter--
                page.value.currentPage = page.value.counter * page.value.pageView + 1
                break
        }
    }

    const pageListInit = () => {
        pageList.value = Array.from(
            Array(Math.ceil(exhViewData.value.length / page.value.limit)).keys()
        ).slice(
            page.value.counter * page.value.pageView,
            (page.value.counter + 1) * page.value.pageView
        )
    }

    ////////////filter Show Modal////////////
    const isFilterShow = ref(false)

    const filterShowHandler = () => {
        isFilterShow.value = !isFilterShow.value
        if (isFilterShow.value === false) {
            const mediaQuery = window.matchMedia('(min-width:768px)')
            if (mediaQuery.matches === false)
                document.querySelector('body').style = 'overflow:hidden'
        } else {
            document.querySelector('body').style = null
        }
    }

    //篩選data (暫時使用通知 子元件重置設定)
    const resetTypeStr = () => {
        resetKeyName.value = ''
    }

    //Reset Filter 單項目設置
    const resetFilterSetHandler = (keyName) => {
        resetKeyName.value = keyName
    }

    //提取query string資料, 賦予queryData
    const queryDataView = (data) => {
        //排除 初始數據做呈現
        const { city, dateValid, startDate, endDate, maxPrice, minPrice, type } = data
        const newValue = {
            dateValid: dateValid === 'false' ? null : dateValid,
            city: city === 'all' ? null : city,
            startDate: startDate !== '0' && startDate !== undefined ? parseInt(startDate) : null,
            endDate: endDate !== '0' && endDate !== undefined ? parseInt(endDate) : null,
            maxPrice: maxPrice === '100000' ? null : parseInt(maxPrice),
            minPrice: minPrice === '0' ? null : parseInt(minPrice),
            type: type === 'all' ? null : type
        }

        Object.keys(newValue).forEach((keyName) => {
            if (newValue[keyName] === null || newValue[keyName] === undefined) {
                delete newValue[keyName]
            }

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

        //
        pageListInit()
        // console.log('queryDataView', newValue)
        queryData.value = { ...newValue }
    }

    //關鍵字搜索
    const searchKeyWordHandler = _.debounce((e) => {
        searchKeyWord.value = e.target.value
        //add q
        router.replace({
            name: 'SearchExhibition',
            query: { ...route.query, keyWord: searchKeyWord.value }
        })
    }, 300)

    //依據queryData篩選資料
    //[FIX] 票價篩選有誤
    const filterExhList = () => {
        console.log('[filterExhList start]', queryData.value)
        let data = [...store.exhibitionList]
        const filter = queryData.value
        data = data.filter((item) => item.endDate > new Date().getTime())

        if (Object.keys(filter).map((item) => item).length === 0) {
            console.log('全部展示')
            // exhViewData.value = store.exhibitionList
        }

        Object.entries(filter).forEach(([key, value]) => {
            console.log(key, value)
            //增加 filter 項目
            //dateValid, city,startDate, endDate, maxPrice, minPrice, type
            switch (key) {
                case 'dateValid':
                    data = data.filter((item) => item.endDate > new Date().getTime())
                    if (value === false) return
                    data = [...store.exhibitionList]
                    console.log('篩選中-1:dateValid', data)
                    break
                case 'city':
                    if (value === 'all') return
                    data = data.filter((item) => item.location.country === value)
                    console.log('篩選中-2:city', data)
                    break
                case 'startDate':
                    if (value === 0) return
                    data = data.filter((item) => item.startDate >= value)
                    console.log('篩選中-3:startDate', data)
                    break
                case 'endDate':
                    if (value === 0) return
                    data = data.filter((item) => item.endDate <= value)
                    break
                //[Fix] 篩選格式不對
                case 'maxPrice':
                    if (value === 0) return
                    data = data.filter((item) => item.maxPrice >= value)
                    break
                //[Fix] 篩選格式不對
                case 'minPrice':
                    if (value === 0) return
                    data = data.filter((item) => item.minPice <= value)
                    break
                case 'type':
                    if (value === 'all') return
                    data = data.filter((item) => item.type === value)
            }
        })

        //queryData(不包含keyword), filter keyword

        if (route.query.keyWord !== '' && route.query.keyWord) {
            console.log(route.query.keyWord)
            data = data.filter((item) => item.name.includes(route.query.keyWord))
            console.log('search', data)
        }

        exhViewData.value = data
        console.log('[filterExhlist] result:', exhViewData.value)
    }

    const resizeHandler = () => {
        const mediaQuery = window.matchMedia('(max-width:768px)')
        console.log(mediaQuery)

        if (mediaQuery.matches === true) {
            isFilterShow.value = true
            document.querySelector('body').style = null
        }

        if (mediaQuery.matches === false) {
            document.querySelector('body').style = null
        }

        if (mediaQuery.matches === true && isFilterShow.value === false) {
            document.querySelector('body').style = 'overflow:hidden'
        } else {
            document.querySelector('body').style = null
        }
    }

    onMounted(async () => {
        if (store.exhibitionList.length === 0) {
            await store.getAllExhibitionData() // 取得展覽全部資料
        }
        queryDataView(route.query) //初始化 query

        //set query keyword
        if (route.query.keyWord) {
            document.querySelector('.search-keyword').value = route.query.keyWord
            searchKeyWord.value = route.query.keyWord
        }
        //[Feature Page slice]
        exhViewData.value = store?.exhibitionList.filter(
            (item) => item.endDate > new Date().getTime()
        )
        // 展覽檢索
        filterExhList()

        //page
        pageListInit()
        watch(page.value, () => {
            pageListInit()
        })

        //[remove filter side hidden]
        window.addEventListener('resize', resizeHandler)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandler)
        document.querySelector('body').style = null
    })

    watch(route, () => {
        queryDataView(route.query) //update query
        // [Feature filter]
        filterExhList()
        page.value.counter = 0
        page.value.currentPage = 1 // update query init page
        pageListInit()
    })
</script>

<style lang="scss" scoped>
    .card-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .image-box {
        object-fit: cover;
        height: 175px;
    }

    .border-bottom-end-3 {
        border-bottom-right-radius: 1.5rem;
    }
</style>
