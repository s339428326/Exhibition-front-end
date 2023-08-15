<template>
    <div class="container">
        <PaymentNavList />

        <router-view />
        <p>確認訂單</p>
    </div>
</template>

<script setup>
    import PaymentNavList from '@/components/payment/PaymentNavList.vue'
</script>

<style lang="scss" scoped></style>
