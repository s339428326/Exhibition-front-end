<script setup>
    import { onMounted, ref, onUpdated } from 'vue'
    import { createOrder } from '../api/order'
    import Cookies from 'js-cookie'

    const html = ref()

    const getPaymentHtml = async () => {
        const res = await createOrder(history.state.data)
        Cookies.set('orderId', res.order.id, { expires: 1 })
        html.value = res.html
    }

    onMounted(async () => {
        await getPaymentHtml()
    })

    onUpdated(() => {
        document.getElementById('_form_aiochk').submit()
    })
</script>
<template>
    <div v-html="html"></div>
</template>
<style lang="scss" scoped></style>
