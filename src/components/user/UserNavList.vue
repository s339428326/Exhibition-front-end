<template>
    <div class="p-3 my-4 bg-secondary bg-opacity-25 rounded-3">
        <h2 class="border-bottom border-dark pb-2">會員</h2>
        <ul class="d-flex flex-column mb-3">
            <li class="py-2">
                <router-link to="/user/information"> 會員資料 </router-link>
            </li>
            <li class="py-2">
                <router-link to="/user/orderSearch"> 訂單查詢 </router-link>
            </li>
            <li class="py-2">
                <router-link to="/user/editPassword"> 修改密碼 </router-link>
            </li>
            <li class="py-2">
                <router-link to="/user/favoriteList"> 收藏展覽 </router-link>
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
