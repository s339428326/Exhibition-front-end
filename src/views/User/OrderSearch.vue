<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { getUserOrder } from '../../api/order'

    // const openArr = ref([])
    const orderData = ref([])
    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const getUserOrderData = async () => {
        try {
            const res = await getUserOrder(user?.userData?.localId)
            console.log('[res order data]', res)
            orderData.value = res?.data.data
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        getUserOrderData()
    })

    watch(userRefs.userData, () => {
        getUserOrderData()
    })
</script>

<template>
    <h1 class="border-bottom mb-4 fs-4 pb-3 fw-medium">訂單查詢</h1>
    <div class="row">
        <div class="col-12">
            <ul>
                <li
                    class="mb-4"
                    v-for="(item, index) in orderData"
                    :key="item?.id"
                >
                    <div class="d-flex border">
                        <div class="flex-grow-1">
                            <p class="border-bottom p-2 bg-dark text-white text-center">建立日期</p>
                            <p class="p-2 text-center">
                                {{ new Date(Date.parse(item?.createAt)).toLocaleDateString() }}
                            </p>
                        </div>
                        <div class="flex-grow-1">
                            <p class="border-bottom p-2 bg-dark text-white text-center">訂單編號</p>
                            <p class="p-2 text-center">{{ item?._id }}</p>
                        </div>
                        <div class="flex-grow-1">
                            <p class="border-bottom p-2 bg-dark text-white text-center">訂單狀態</p>
                            <p class="p-2 text-center">購買完成</p>
                        </div>
                        <div class="flex-grow-1">
                            <p class="border-bottom p-2 bg-dark text-white text-center">總金額</p>
                            <p class="p-2 text-center">${{ item?.total }}</p>
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
                    <!-- <button class="d-flex gap-2 align-items-center border-0 tr mb-3">
                        <PlaylistPlus :size="24" />
                        <p>訂單內容</p>
                    </button> -->
                    <ul :class="`border border-dark p-2 d-flex flex-column gap-2 `">
                        <li
                            class="d-flex justify-content-between gap-4"
                            v-for="(item, index) in item?.orderList"
                            :key="index"
                        >
                            <p>{{ item?.name }}</p>
                            <div class="d-flex gap-4">
                                <p>單價 {{ item?.price }}</p>
                                <p>數量 {{ item?.quantity }}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
