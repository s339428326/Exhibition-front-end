<script setup>
    import { onMounted, ref, onUpdated } from 'vue'
    import { createPaymentOrder } from '../api/ec'

    const html = ref()

    const getPaymentHtml = async () => {
        const res = await createPaymentOrder()
        html.value = res.data.html
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
