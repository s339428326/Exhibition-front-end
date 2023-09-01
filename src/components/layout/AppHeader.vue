<template>
    <header class="text-black bg-primary">
        <nav class="container py-4 d-flex justify-content-between align-items-center">
            <div class="d-flex gap-4 align-items-center">
                <RouterLink
                    class="fs-4 text-black font-alata"
                    to="/"
                >
                    <span class="fw-normal text-secondary fs-4">A</span>
                    <span class="fw-normal text-light fs-4">rt Search Fair</span>
                </RouterLink>
                <div class="d-flex gap-2 bg-light p-1 rounded-2">
                    <Magnify />
                    <input
                        class="border-0 bg-light outline-0"
                        type="search"
                        placeholder="搜尋展覽、音樂、藝文"
                        name="search"
                        id="home-search"
                    />
                </div>
            </div>

            <ul class="d-flex gap-3 fs-6 fw-bold align-items-center">
                <!-- <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/"
                        >Home</RouterLink
                    >
                </li> -->
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
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import UserButton from '../UserButton.vue'
    import CartButton from '../cartButton.vue'
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/layouts/header';
    @import '@/assets/scss/layouts/footer';

    // Google font for Logo
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

    .outline-0 {
        outline: none;
    }

    .font-alata {
        font-family: 'Alata', sans-serif;
    }

    .nav-item:hover {
        color: $primary;
    }
    .nav-link {
        color: white;
    }

    .router-link-active.router-link-exact-active.nav-link {
        color: $danger;
        /* font-weight: 700; */
    }
</style>
