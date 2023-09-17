<template>
    <div v-if="!store.userData?.localId">
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
        <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
        >
            <template #button-content>
                <div class="d-flex align-items-center btn-user gap-2 flex-wrap">
                    <div class="border rounded-circle avatar-container">
                        <img
                            class="avatar me-2"
                            :src="`${store.userData.picture}`"
                        />
                    </div>
                    <div class="overflow-hidden user-name">
                        <span class="text-light fs-6">{{ store.userData.name }}</span>
                    </div>
                </div>
            </template>
            <b-dropdown-item to="/user/information">會員資料</b-dropdown-item>
            <b-dropdown-item to="/user/orderSearch">訂單查詢</b-dropdown-item>
            <b-dropdown-item to="/user/editPassword">修改密碼</b-dropdown-item>
            <b-dropdown-item to="/user/favoriteList">收藏展覽</b-dropdown-item>
            <b-dropdown-item @click="logout()"> 登出 </b-dropdown-item>
        </b-dropdown>
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

    //vue router
    const router = useRouter()

    //loading state
    const isLoading = ref(false)
    //store
    const store = userDataStore()

    //驗證token
    const verifyToken = async () => {
        isLoading.value = true

        const token = localStorage.getItem('token')
        let userId = ''
        if (token) {
            userId = await store.confirmToken(token)
        } else {
            isLoading.value = false
            return
        }
        //如果失敗跳出運作
        if (userId === false) {
            isLoading.value = false
            return
        }

        const userInfoData = await store.getUserInfoData(userId)
        console.log('[userInfoData]', userInfoData)
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
        max-width: 150px;
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

    .user-name {
        max-width: 100px;
    }
</style>
