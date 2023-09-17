<template>
    <div class="shadow border border-dark">
        <h2 class="border-bottom border-dark pb-2 fs-5 fw-medium p-2">會員</h2>
        <ul class="d-flex flex-column gap-3 p-2">
            <li class="">
                <router-link to="/user/information"> 會員資料 </router-link>
            </li>
            <li class="">
                <router-link to="/user/favoriteList"> 收藏展覽 </router-link>
            </li>
            <li class="">
                <router-link to="/user/orderSearch"> 訂單查詢 </router-link>
            </li>
            <li class="">
                <router-link to="/user/editPassword"> 修改密碼 </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
    .router-link-active {
        color: black;
        font-weight: 700;
    }
</style>
