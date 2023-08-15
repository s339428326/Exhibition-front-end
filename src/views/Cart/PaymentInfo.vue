<template>
    <div class="container">
        <PaymentNavList />

        <router-view />
        <p>填寫付款資料</p>
    </div>
</template>

<script setup>
    import PaymentNavList from '@/components/payment/PaymentNavList.vue'
</script>

<style lang="scss" scoped></style>
