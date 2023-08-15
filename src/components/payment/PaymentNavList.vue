<template>
    <div>
        <ul class="d-flex mb-3">
            <li class="px-3 py-2">
                <router-link to="/payment/confirm"> 確認訂單 </router-link>
            </li>
            <li class="px-3 py-2">
                <router-link to="/payment/orderInfo"> 填寫訂購資料 </router-link>
            </li>
            <li class="px-3 py-2">
                <router-link to="/payment/paymentInfo"> 填寫付款資料 </router-link>
            </li>
            <li class="px-3 py-2">
                <router-link to="/payment/orderSuccess"> 完成訂購 </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
    .router-link-active {
        color: $success;
        font-weight: 700;
    }
</style>
