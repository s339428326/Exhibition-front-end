<template>
    <div class="container my-5">
        <div class="row mb-3">
            <div class="col-6 d-flex">
                <b-form-input
                    v-model="keyword"
                    placeholder="請輸入關鍵字"
                ></b-form-input>
                <Magnify class="ms-2 fs-4" />
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <p class="d-inline-block">熱門類型：</p>
                <ul class="d-inline-flex tagList">
                    <li
                        v-for="(tagItem, idx) in tagList"
                        :key="idx"
                    >
                        <span class="btn btn-primary rounded-pill px-3 py-1 me-2">{{
                            tagItem
                        }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <div>
                    <b-form-group label="類型">
                        <b-form-checkbox-group
                            id="checkbox-group-1"
                            v-model="typeSelected"
                            :options="typeOptions"
                            name="flavour-1"
                            stacked
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
            <div class="col-9">
                <p class="mb-3">搜索結果項目：213</p>
                <b-card
                    img-src="https://placekitten.com/1000/300"
                    img-alt="Card image"
                    img-top
                >
                    <b-card-text>
                        Some quick example text to build on the card and make up the bulk of the
                        card's content.
                    </b-card-text>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const keyword = ref(null)
    const tagList = ref(['科技', '藝文', '影視'])
    const typeOptions = ref([
        { text: '全部', value: 't0' },
        { text: '藝文', value: 't1' },
        { text: '科技', value: 't2' },
        { text: '影視', value: 't3' },
        { text: '戲劇', value: 't4' }
    ])
    const typeSelected = ref([])
</script>

<style lang="scss" scoped></style>
