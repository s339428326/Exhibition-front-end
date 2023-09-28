<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { userDataStore } from '../../stores/userData'
    import { getUserOrder } from '../../api/order'
    import Order from '../../components/user/Order.vue'

    const user = userDataStore()
    const userRefs = storeToRefs(user)

    const orders = ref([])

    const getUserOrderData = async () => {
        if (!user?.userData?.id) return
        try {
            const res = await getUserOrder(user?.userData?.id)
            console.log('[res order data]', res)
            orders.value = res?.data?.orders
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        getUserOrderData()
        watch(userRefs.userData, () => {
            getUserOrderData()
        })
    })
</script>

<template>
    <h1 class="border-bottom mb-4 fs-4 pb-3 fw-medium">訂單查詢</h1>
    <div class="row">
        <div class="col-12">
            <ul class="list-unstyled">
                <li
                    v-for="(item, index) in orders"
                    :key="index"
                    class="mb-4"
                >
                    <Order :order="item" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
