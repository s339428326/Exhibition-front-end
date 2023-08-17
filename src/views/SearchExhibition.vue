<template>
    <div class="container my-5">
        <div class="row mb-3">
            <div class="col-6 d-flex">
                <b-form-input
                    v-model="keyword"
                    placeholder="請輸入關鍵字"
                ></b-form-input>
                <Magnify class="ms-2 fs-4 pointer" />
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <p class="d-inline-block">熱門類型：</p>
                <ul class="d-inline-flex tagList">
                    <li
                        v-for="(tagItem, idx) in tagList"
                        :key="idx"
                        class="pointer"
                    >
                        <span class="btn btn-primary rounded-pill px-3 py-1 me-1">{{
                            tagItem
                        }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row mt-5 gx-5">
            <div class="col-3 border border-2 py-3 rounded-3 shadow">
                <div class="mb-3">
                    <b-form-checkbox
                        id="isShowEnded-checkbox"
                        v-model="isShowEnded"
                        name="isShowEnded-checkbox"
                        value="true"
                        unchecked-value="false"
                    >
                        顯示已結束展覽
                    </b-form-checkbox>
                </div>
                <div class="mb-3">
                    <RadioList
                        label="類型"
                        name="type-radios"
                        :options="typeOptions"
                        v-model="typeSelected"
                        @update="updateType"
                        className="typeList"
                        btnName="顯示更多"
                        @btnEvent="showMoreType"
                    />
                </div>

                <div class="mb-3">
                    <DatePicker
                        label="開始時間"
                        @update="updateStartTime"
                        class="mb-3"
                    />
                    <DatePicker
                        label="結束時間"
                        @update="updateEndTime"
                    />
                </div>

                <div class="mb-3">
                    <InputRange
                        label="價格"
                        v-model="priceSelected"
                        @update="updatePrice"
                    />
                </div>

                <div class="mb-3">
                    <b-form-group
                        label="地區"
                        v-slot="{ filterInput }"
                    >
                        <b-form-input
                            v-model="filterArea"
                            placeholder="請輸入地區"
                            :aria-describedby="filterInput"
                            class="mb-2"
                        ></b-form-input>
                        <RadioList
                            label=""
                            name="area-radios"
                            :options="areaOptions"
                            v-model="areaSelected"
                            @update="updateArea"
                            className="areaList"
                        />
                    </b-form-group>
                </div>
            </div>
            <div class="col-9">
                <p class="mb-3">搜索結果項目：213</p>
                <ul class="fairList d-flex flex-wrap">
                    <li
                        v-for="(fairItem, idx) in fairList"
                        :key="idx"
                        class="mx-2 my-2"
                    >
                        <CardFair
                            :title="fairItem.title"
                            :imgSrc="fairItem.imgSrc"
                            :linkTo="fairItem.linkTo"
                            :textContent="fairItem.textContent"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CardFair from '@/components/card/CardFair.vue'
    import RadioList from '@/components/inputRadio/RadioList.vue'
    import InputRange from '@/components/inputRange/inputRange.vue'
    import DatePicker from '@/components/datePicker/datePicker.vue'

    import { ref } from 'vue'
    const keyword = ref(null)
    const tagList = ref(['科技', '藝文', '影視'])

    const isShowEnded = ref(null)

    // 類型清單
    const typeOptions = ref([
        {
            name: '全部',
            value: '全部'
        },
        {
            name: '藝文',
            value: '藝文'
        },
        {
            name: '科技',
            value: '科技'
        },
        {
            name: '影視',
            value: '影視'
        },
        {
            name: '戲劇',
            value: '戲劇'
        }
    ])
    const anotherTypeOptions = ref([
        {
            name: '親子',
            value: '親子'
        },
        {
            name: '講座',
            value: '講座'
        }
    ])
    const typeSelected = ref(null)
    const updateType = (newVal) => {
        typeSelected.value = newVal
    }
    const showMoreType = () => {
        anotherTypeOptions.value.forEach((item) => {
            typeOptions.value.push(item)
        })
    }

    // 地區清單
    const filterArea = ref(null)

    const areaOptions = ref([
        { name: '全部', value: '全部' },
        { name: '台北', value: '台北' },
        { name: '新北', value: '新北' },
        { name: '基隆', value: '基隆' },
        { name: '桃園', value: '桃園' },
        { name: '新竹', value: '新竹' },
        { name: '苗栗', value: '苗栗' },
        { name: '台中', value: '台中' },
        { name: '南投', value: '南投' },
        { name: '彰化', value: '彰化' },
        { name: '雲林', value: '雲林' },
        { name: '嘉義', value: '嘉義' },
        { name: '台南', value: '台南' },
        { name: '高雄', value: '高雄' },
        { name: '屏東', value: '屏東' },
        { name: '台東', value: '台東' },
        { name: '花蓮', value: '花蓮' },
        { name: '宜蘭', value: '宜蘭' }
    ])
    const areaSelected = ref(null)
    const updateArea = (newVal) => {
        areaSelected.value = newVal
    }

    // 價格
    const priceSelected = ref(null)
    const updatePrice = (newVal) => {
        priceSelected.value = newVal
    }

    // 時間
    const startTime = ref(new Date())
    const updateStartTime = (newVal) => {
        startTime.value = newVal
    }

    const endTime = ref(new Date())
    const updateEndTime = (newVal) => {
        endTime.value = newVal
    }

    const fairList = ref([
        {
            title: 'A Show',
            imgSrc: 'https://picsum.photos/600/300/?image=22',
            linkTo: '/viewExhibition',
            textContent: '花曲－陳瑞瓊膠彩畫'
        },
        {
            title: 'B Show',
            imgSrc: 'https://picsum.photos/600/300/?image=23',
            linkTo: '/viewExhibition',
            textContent: '花曲－陳瑞瓊膠彩畫'
        },
        {
            title: 'C Show',
            imgSrc: 'https://picsum.photos/600/300/?image=24',
            linkTo: '/viewExhibition',
            textContent: '花曲－陳瑞瓊膠彩畫'
        },
        {
            title: 'D Show',
            imgSrc: 'https://picsum.photos/600/300/?image=25',
            linkTo: '/viewExhibition',
            textContent: '花曲－陳瑞瓊膠彩畫'
        },
        {
            title: 'E Show',
            imgSrc: 'https://picsum.photos/600/300/?image=26',
            linkTo: '/viewExhibition',
            textContent: '花曲－陳瑞瓊膠彩畫'
        }
    ])
</script>

<style lang="scss" scoped>
    .fairList {
        margin-left: -8px;
        margin-right: -8px;
        li {
            width: calc((100% / 3) - 32px);
            transition: 0.3s ease-in-out;

            @include media-lg {
                width: calc((100% / 2) - 16px);
            }

            @include media-sm {
                width: 100%;
            }

            &:hover {
                transform: scale(1.04);
            }
        }
    }

    :deep(.areaList) {
        height: 210px;
        overflow: auto;
    }

    :deep(.typeList),
    :deep(.areaList) {
        .form-check {
            border: 1px solid $gray-500;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 0;
            padding-left: 36px;

            &:first-of-type {
                border-radius: 6px 6px 0 0;
            }
            &:last-of-type {
                border-radius: 0 0 6px 6px;
            }
        }
    }

    .shadow {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
</style>
