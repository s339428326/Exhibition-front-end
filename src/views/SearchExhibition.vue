<template>
    <div :class="`d-flex `">
        <!-- filter side -->
        <div :class="`side border-end ${isFilterShow ? 'w-20 ' : 'border-none'}`">
            <div :class="`m-4 ${isFilterShow && 'd-none'}`">
                <div class="d-flex gap-2 align-items-center border-bottom pb-4 mb-4 px-3">
                    <input
                        id="date-valid"
                        class=""
                        type="checkbox"
                        name="checkbox"
                    />
                    <!--  -->
                    <label
                        for="date-valid"
                        class="pb-1"
                        >顯示已結束展覽</label
                    >
                </div>
                <div>
                    <p class="fw-bold mb-2">類型</p>
                    <!-- component radioList -->
                    <ul class="type-list rounded-3 border mb-1">
                        <li class="border-bottom p-2">
                            <div>
                                <input
                                    class="me-2"
                                    id="type-all"
                                    type="radio"
                                    name="type"
                                    value="all"
                                    checked="true"
                                />
                                <label for="type-all">全部</label>
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
                            <div>
                                <input
                                    class="me-2"
                                    :id="item"
                                    type="radio"
                                    name="type"
                                    :value="item"
                                />
                                <label
                                    class=""
                                    :for="item"
                                >
                                    {{ item }}</label
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
            </div>
        </div>
        <!-- main -->
        <div class="w-75 flex-grow-1">
            <button
                type="button"
                @click="filterShowHandler"
            >
                Filter
                {{ isFilterShow }}
            </button>
            {{ new Date(filterSetData.endDate) }}
            {{ filterData.typeQuantity }}
            <!-- 這裡更新資料連動去init Filter Data -->
        </div>
    </div>
</template>

<script setup>
    // import CardFair from '@/components/card/CardFair.vue'
    // import DatePicker from '@/components/datePicker/datePicker.vue'
    // import RadioList from '@/components/inputRadio/RadioList.vue'
    // import InputRange from '@/components/inputRange/inputRange.vue'

    import { ref, onMounted } from 'vue'
    import { exhibitionStore } from '../stores/exhibitionList'

    onMounted(async () => {
        if (store.value.exhibitionList.length === 0) {
            await store.value.getAllExhibitionData() // 取得展覽全部資料
        }
        initFilterData() //初始化篩選器資料
        console.log('[BeforeMount]', store.value.exhibitionList)
    })

    //exhibition Data
    const store = ref(exhibitionStore())

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
        endDate: new Date().getTime() + 90 * 24 * 60 * 60 * 100,
        minPrice: 0,
        maxPrice: 3000,
        location: 'all'
    })

    //init Filter Data
    const initFilterData = () => {
        filterData.value.typeArr = Array.from(
            new Set(store.value.exhibitionList.map((item) => item.type))
        )
    }

    //side bar show
    const isFilterShow = ref(false)
    const filterShowHandler = () => {
        isFilterShow.value = !isFilterShow.value
    }

    //filter type show Quantity
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

<style lang="scss">
    //filter slider
    .side {
        overflow: hidden;
        /* transform: translateX(-100%); */
        width: 25%;
        transition: all 0.25s ease-in;
    }

    .w-75 {
        width: 75%;
    }

    .type-list {
        li:last-child {
            border-bottom: 0px !important;
        }
    }

    .w-20 {
        width: 0%;
    }
</style>
