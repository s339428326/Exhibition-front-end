<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>

    <div class="top">
        <button
            type="button"
            class="btn btn-success"
            @click="fetchData"
        >
            Fetch Data
        </button>

        <BButton
            @click.stop="showModal = !showModal"
            class="ms-4"
            >Open Modal</BButton
        >
        <BModal
            @hidden="hidden"
            v-model="showModal"
        >
            <p class="text-success">This is a test modal.</p>
        </BModal>
    </div>

    <div class="content">
        <div
            role="status"
            :class="isLoading ? 'spinner-border text-primary' : ''"
        ></div>

        <b-table
            responsive
            :items="exhibitionData"
        ></b-table>
    </div>
</template>

<script setup>
    import { BButton, BModal } from 'bootstrap-vue-next'
    import { useExhibitionStore } from '../stores/exhibitionList'
    import { storeToRefs } from 'pinia'

    import { ref } from 'vue'

    const exhibitionData = ref([])
    const showModal = ref(false)
    const isLoading = ref(false)

    const fetchData = () => {
        isLoading.value = true

        const exhibitionStore = useExhibitionStore()

        // 透過storeToRefs 解構state
        const { exhibitionList } = storeToRefs(exhibitionStore)

        if (exhibitionStore.rawExhibitionList.length === 0) {
            exhibitionStore.getExhibitionData().then(() => {
                exhibitionData.value = exhibitionList.value
                isLoading.value = true
            })
        } else {
            exhibitionData.value = exhibitionList.value
        }
    }

    const hidden = () => {
        console.log('Hided Modal')
    }
</script>

<style lang="scss">
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 24px 0;
    }
</style>
