<template>
    <div v-if="!store.userData?.id">
        <button
            type="button"
            :class="`btn btn-secondary text-white d-flex align-items-center gap-2 ${
                isLoading && 'd-none'
            }`"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
        >
            <AccountCircle />
            登入 / 註冊
        </button>
    </div>
    <div
        v-else
        class="d-flex pointer"
    >
        <div class="btn-group">
            <button
                class="btn border-0 d-flex align-items-center btn-user gap-2 flex-wrap"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <div class="btn-user">
                    <img
                        class="avatar me-2"
                        :src="`${store.userData?.avatar?.imageUrl}`"
                    />
                    <span class="overflow-hidden user-name text-light fs-6">{{
                        store.userData?.username
                    }}</span>
                </div>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
                <router-link
                    class="dropdown-item"
                    to="/user/information"
                    >會員資料</router-link
                >
                <router-link
                    class="dropdown-item"
                    to="/user/orderSearch"
                    >訂單查詢</router-link
                >
                <router-link
                    class="dropdown-item"
                    to="/user/editPassword"
                    >修改密碼</router-link
                >
                <router-link
                    class="dropdown-item"
                    to="/user/favoriteList"
                    >收藏展覽</router-link
                >
                <button
                    type="button"
                    class="dropdown-item"
                    @click="logout"
                >
                    登出
                </button>
            </div>
        </div>
    </div>

    <!-- 讀取狀態 -->
    <button
        type="button"
        :class="`btn btn-secondary text-white d-flex align-items-center gap-2 ${
            !isLoading && 'd-none'
        }`"
    >
        <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
    </button>
</template>

<script setup>
    import { userDataStore } from '../stores/userData'
    import { useRouter } from 'vue-router'
    import { ref, onBeforeMount } from 'vue'
    import Cookies from 'js-cookie'

    //vue router
    const router = useRouter()

    //loading state
    const isLoading = ref(false)
    //store
    const store = userDataStore()

    //驗證token
    const verifyToken = async () => {
        isLoading.value = true

        const token = Cookies.get('token')

        if (!token) {
            isLoading.value = false
            return
        } else {
            await store.confirmToken(token)
        }

        isLoading.value = false
    }

    //fake logoutState
    const logout = () => {
        //clear login
        console.log('登出')
        store.logout()
        router.push({ name: 'Home' })
    }

    onBeforeMount(() => {
        verifyToken()
    })
</script>

<style lang="scss" scoped>
    .btn-user {
        max-width: 400px;
        overflow: hidden;
    }

    .avatar {
        border-radius: 50%;
        object-fit: cover;
        width: 36px;
        height: 36px;
        vertical-align: middle;
    }

    .avatar-container {
        width: 36px;
        height: 36px;
    }
</style>
