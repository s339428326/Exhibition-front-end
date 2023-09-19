<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'

    import UserButton from '../UserButton.vue'
    import CartButton from '../cartButton.vue'
    import Alert from '../Alert/Alert.vue'

    import { userDataStore } from '../../stores/userData'

    const user = userDataStore()
    const isShow = ref(false)
</script>

<template>
    <header class="position-sticky top-0 text-black bg-dark z-3">
        <nav class="container py-3 d-flex justify-content-between align-items-center">
            <div class="d-flex gap-4 align-items-center">
                <RouterLink
                    class="fs-4 text-light font-quantum l-h-1"
                    to="/"
                >
                    <div>
                        <span class="fw-normal text-secondary fs-4">A</span>
                        <span class="fw-normal fs-4">rt</span>
                    </div>

                    <span class="fw-normal fs-4"> Search </span>
                    <p class="text-secondary">Fair</p>
                </RouterLink>
            </div>

            <ul class="d-none d-md-flex gap-3 fs-6 fw-bold align-items-center">
                <li class="nav-item">
                    <RouterLink
                        class="nav-link fw-medium"
                        to="/searchExhibition"
                        >搜索頁</RouterLink
                    >
                </li>
                <li>
                    <CartButton />
                </li>
                <li class="nav-item">
                    <UserButton />
                </li>
            </ul>
            <div class="d-block d-md-none">
                <button
                    @click="() => (isShow = !isShow)"
                    class="btn bg-transparent border-0"
                >
                    <menuIcon
                        :size="32"
                        :fillColor="'#fff'"
                    />
                </button>

                <ul :class="`mobile-menu d-flex flex-column ${isShow && 'menu-show'}`">
                    <li class="border-bottom border-top text-center">
                        <router-link
                            class="d-block p-3 text-white"
                            @click="() => (isShow = !isShow)"
                            to="/searchExhibition"
                            >搜索頁</router-link
                        >
                    </li>
                    <li class="border-bottom text-center">
                        <router-link
                            class="d-block p-3 text-white"
                            @click="() => (isShow = !isShow)"
                            to="/user/information"
                            >會員資料</router-link
                        >
                    </li>
                    <li class="border-bottom text-center">
                        <router-link
                            class="d-block p-3 text-white"
                            @click="() => (isShow = !isShow)"
                            to="/user/orderSearch"
                            >訂單查詢</router-link
                        >
                    </li>
                    <li class="border-bottom text-center">
                        <router-link
                            class="d-block p-3 text-white"
                            @click="() => (isShow = !isShow)"
                            to="/user/favoriteList"
                            >收藏展覽</router-link
                        >
                    </li>

                    <li class="border-bottom text-center">
                        <div
                            v-if="!user.userData?.localId"
                            class="d-flex justify-content-center p-3"
                        >
                            <UserButton />
                        </div>
                        <div v-else>
                            <button
                                @click="
                                    () => {
                                        user.logout()
                                        isShow = !isShow
                                    }
                                "
                                class="btn border-0 bg-transparent text-white p-3"
                            >
                                登出
                            </button>
                        </div>
                    </li>
                    <li class="text-center p-3">
                        <CartButton />
                    </li>
                </ul>
            </div>
        </nav>
        <Teleport to="body">
            <Alert />
        </Teleport>
    </header>
</template>

<style lang="scss" scoped>
    // Google font for Logo
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

    .l-h-1 {
        line-height: 0.75;
    }

    .nav-link:hover {
        opacity: 0.8;
    }
    .nav-link {
        color: white;
        opacity: 1;
    }

    .router-link-active.router-link-exact-active.nav-link {
        color: red;
    }

    /* position-absolute top-100 start-0 end-0 bg-blue */
    .mobile-menu {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        background-color: #212529;
        color: white;
        height: 0px;
        transition: 0.25s;
        overflow: hidden;
    }

    .menu-show {
        height: 376px;
    }
</style>
