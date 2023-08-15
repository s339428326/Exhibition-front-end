<template>
    <div class="d-flex pointer">
        <div>
            <b-dropdown
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
                <template #button-content>
                    <AccountCircle class="me-1" />
                    <template v-if="isLogin">
                        <span>登出</span>
                    </template>
                    <template v-else>
                        <span>登入</span>
                    </template>
                </template>
                <b-dropdown-item to="/user/information">會員資料</b-dropdown-item>
                <b-dropdown-item to="/user/orderSearch">訂單查詢</b-dropdown-item>
                <b-dropdown-item to="/user/editPassword">修改密碼</b-dropdown-item>
                <b-dropdown-item to="/user/favoriteList">收藏展覽</b-dropdown-item>
                <b-dropdown-item>登出</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const isLogin = ref(true)
</script>

<style lang="scss" scoped>
    .pointer {
        cursor: pointer;
    }
</style>
