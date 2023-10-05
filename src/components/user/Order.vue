<script setup>
    import { ref } from 'vue'

    const isShow = ref(false)

    const showDropOrdersHandler = () => {
        isShow.value = !isShow.value
    }

    defineProps({
        order: Object
    })
</script>
<template>
    <div>
        <div class="d-flex border">
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">建立日期</p>
                <p class="p-2 text-center">
                    {{ new Date(Date.parse(order?.createAt)).toLocaleDateString() }}
                </p>
            </div>
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">訂單編號</p>
                <p class="p-2 text-center">{{ order?._id }}</p>
            </div>
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">訂單狀態</p>
                <p class="p-2 text-center">{{ order?.isPay ? '已付款' : '未付款' }}</p>
            </div>
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">總金額</p>
                <p class="p-2 text-center">${{ order?.total }}</p>
            </div>
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">說明</p>
                <p class="p-2 text-center">無</p>
            </div>
            <div class="flex-grow-1">
                <p class="border-bottom p-2 bg-dark text-white text-center">聯絡客服</p>
                <p class="p-2 text-center">點擊這裡</p>
            </div>
        </div>
        <!-- 購買內容 -->
        <button
            @click="showDropOrdersHandler"
            class="d-flex gap-2 align-items-center border-0 tr mb-3 bg-transparent"
        >
            <PlaylistPlus :size="24" />
            <p>訂單內容</p>
        </button>
        <ul
            :class="`border border-dark p-2 d-flex flex-column gap-2 ${
                isShow ? 'd-block' : 'd-none'
            }`"
        >
            <li
                class="d-flex justify-content-between gap-4"
                v-for="(item, index) in order?.orderList"
                :key="index"
            >
                <p>{{ item?.name }}({{ item?.ticketType }})</p>
                <div class="d-flex gap-4">
                    <p>單價 {{ item?.price }}</p>
                    <p>x{{ item?.quantity }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .orderList {
        overflow: hidden;
        height: 0;
    }
</style>
