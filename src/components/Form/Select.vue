<script setup>
    import { ref, onBeforeMount } from 'vue'
    const currentItem = ref('未設置初始項目(defaultValue)')
    const isShow = ref(false)

    const props = defineProps({
        defaultValue: String,
        itemList: Array
    })

    const dropHandler = () => {
        isShow.value = !isShow.value
    }

    const currentItemHandler = (currentValue) => {
        currentItem.value = currentValue
    }

    const initDataSync = () => {
        if (props.defaultValue) {
            currentItem.value = props.defaultValue
        }
    }

    onBeforeMount(() => {
        initDataSync()
    })
</script>
<template>
    <!-- rounded-top -->
    <button
        @click="dropHandler"
        type="button"
        :class="`content d-flex align-items-center border p-2 position-relative bg-transparent ${
            isShow ? 'rounded-top' : 'rounded'
        } `"
    >
        <div class="d-flex gap-2">
            <p class="item-width">{{ currentItem }}</p>
            <MenuDown />
        </div>
        <ul :class="`dorp-list ${isShow ? 'border rounded-bottom' : 'd-none'}`">
            <li v-if="!props.itemList?.length">目前未設置下拉項目(itemList)</li>
            <li
                class="px-2 py-3 text-start"
                @click="currentItemHandler(itemList?.[index])"
                v-for="(item, index) in props.itemList"
                :key="index"
            >
                {{ item }}
            </li>
        </ul>
    </button>
</template>
<style lang="scss" scoped>
    .item-width {
        width: 64px;
        text-wrap: nowrap;
        overflow: hidden;
    }

    .dorp-list {
        position: absolute;
        overflow: hidden;
        top: 100%;
        right: -1px;
        left: -1px;
        background: #fff;
        transition: all 0.25s ease-in;
    }

    .dorp-list.show {
    }
</style>
