<script setup>
    import { ref, onBeforeMount, onMounted, watch } from 'vue'
    import { userDataStore } from '../../stores/userData'
    import { useAlert } from '../../stores/alertSlice'
    import { useRouter } from 'vue-router'

    import Alert from '../../components/Alert/Alert.vue'

    const user = userDataStore()
    const { callAlert } = useAlert()
    const router = useRouter()

    //身份認證頁面路由導向
    const userRoleChecker = () => {
        if (user.userData?.role === 'admin') {
            router.push({ name: 'DataBoard' })
        }
        if (user.userData?.role === 'inspector') {
            router.push({ name: 'TickerChecker' })
        }
    }

    onBeforeMount(() => {
        //身份驗證記得開啟
        if (!user?.userData?.role) {
            callAlert({ title: '請家新登入', type: 'error' })
            router.push({ name: 'AdminLogin' })
        }
    })

    onMounted(() => {
        userRoleChecker()
    })
</script>
<template>
    <main class="d-flex">
        <!-- side bar -->
        <div class="vh-100 border-end d-flex flex-column w-25">
            <h1 class="fs-4 px-2 py-4">後台</h1>
            <ul class="d-flex flex-column gap-2 px-2 flex-grow-1">
                <li v-if="user?.userData?.role === 'admin'">
                    <router-link to="/admin/main/databoard">後台資料</router-link>
                </li>
                <li v-if="user?.userData?.role === 'inspector'">
                    <router-link to="/admin/main/ticketchecker">檢票人員</router-link>
                </li>
                <li class="mt-auto py-3">
                    <router-link to="/admin/login">登出</router-link>
                </li>
            </ul>
        </div>

        <div class="w-75 vh-100">
            <p>Test:{{ JSON.stringify(user.userData?.role) }}</p>
            <Teleport to="body">
                <Alert />
            </Teleport>
            <router-view />
        </div>
    </main>
</template>
<style lang="scss" scoped></style>
